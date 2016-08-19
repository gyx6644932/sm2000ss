/*
拓扑图
*/
function loadTopoData(arr) {
    var topology = new Topology('container'),
        nodes = [{
            id: '主机框',
            type: 'switch',
            status: 1,
            server:true
        }], 
        links = [];
    for (var i = 0; i < arr.length; i++) {
        var obj = {
            type: 'switch',
            status: 1,
            expand: true,
            id : arr[i]
        },
        os ={
            source: '主机框',
            target: arr[i]
        }
        nodes.push(obj);
        links.push(os)
    }

    topology.addNodes(nodes);
    topology.addLinks(links);
    //可展开节点的点击事件
    // topology.setNodeClickFn(function(node) {
    //     if (!node['_expanded']) {
    //         mainTemplate('macFrame','3067ed6c81ad432ea144934c55051ebe');
    //         expandNode(node.id);
    //         node['_expanded'] = true;
    //     } else {
    //         collapseNode(node.id);
    //         node['_expanded'] = false;
    //     }
    // });
    topology.update();
}
function Topology(ele) {
    typeof(ele) == 'string' && (ele = document.getElementById(ele));
    if(ele.getElementsByTagName("svg") && ele.getElementsByTagName("svg").length > 0){
        var svg = ele.getElementsByTagName("svg");
        for (var i = 0; i < svg.length; i++) {
            if(svg[i].parentNode){
                svg[i].parentNode.removeChild(svg[i]);
            }
        }
    }
    var w = ele.clientWidth,
        h = ele.clientHeight,
        self = this;
    this.force = d3.layout.force().gravity(.05).distance(70).charge(-800).size([w, h]);
    this.nodes = this.force.nodes();
    this.links = this.force.links();
    this.clickFn = function() {};
    this.vis = d3.select(ele).append("svg:svg")
        .attr("width", w).attr("height", h).attr("pointer-events", "all");

    this.force.on("tick", function(x) {
        self.vis.selectAll("g.node")
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        self.vis.selectAll("line.link")
            .attr("x1", function(d) {
                return d.source.x;
            })
            .attr("y1", function(d) {
                return d.source.y;
            })
            .attr("x2", function(d) {
                return d.target.x;
            })
            .attr("y2", function(d) {
                return d.target.y;
            });
    });
}


Topology.prototype.doZoom = function() {
    d3.select(this).select('g').attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")");

}


//增加节点
Topology.prototype.addNode = function(node) {
    this.nodes.push(node);
}

Topology.prototype.addNodes = function(nodes) {
    if (Object.prototype.toString.call(nodes) == '[object Array]') {
        var self = this;
        nodes.forEach(function(node) {
            self.addNode(node);
        });

    }
}

//增加连线
Topology.prototype.addLink = function(source, target) {
    this.links.push({
        source: this.findNode(source),
        target: this.findNode(target)
    });
}

//增加多个连线
Topology.prototype.addLinks = function(links) {
    if (Object.prototype.toString.call(links) == '[object Array]') {
        var self = this;
        links.forEach(function(link) {
            self.addLink(link['source'], link['target']);
        });
    }
}


//删除节点
Topology.prototype.removeNode = function(id) {
    var i = 0,
        n = this.findNode(id),
        links = this.links;
    while (i < links.length) {
        links[i]['source'] == n || links[i]['target'] == n ? links.splice(i, 1) : ++i;
    }
    this.nodes.splice(this.findNodeIndex(id), 1);
}

//删除节点下的子节点，同时清除link信息
Topology.prototype.removeChildNodes = function(id) {
    var node = this.findNode(id),
        nodes = this.nodes;
    links = this.links,
        self = this;

    var linksToDelete = [],
        childNodes = [];

    links.forEach(function(link, index) {
        link['source'] == node && linksToDelete.push(index) && childNodes.push(link['target']);
    });

    linksToDelete.reverse().forEach(function(index) {
        links.splice(index, 1);
    });

    var remove = function(node) {
        var length = links.length;
        for (var i = length - 1; i >= 0; i--) {
            if (links[i]['source'] == node) {
                var target = links[i]['target'];
                links.splice(i, 1);
                nodes.splice(self.findNodeIndex(node.id), 1);
                remove(target);

            }
        }
    }

    childNodes.forEach(function(node) {
        remove(node);
    });

    //清除没有连线的节点
    for (var i = nodes.length - 1; i >= 0; i--) {
        var haveFoundNode = false;
        for (var j = 0, l = links.length; j < l; j++) {
            (links[j]['source'] == nodes[i] || links[j]['target'] == nodes[i]) && (haveFoundNode = true)
        }!haveFoundNode && nodes.splice(i, 1);
    }
}



//查找节点
Topology.prototype.findNode = function(id) {
    var nodes = this.nodes;
    for (var i in nodes) {
        if (nodes[i]['id'] == id) return nodes[i];
    }
    return null;
}


//查找节点所在索引号
Topology.prototype.findNodeIndex = function(id) {
    var nodes = this.nodes;
    for (var i in nodes) {
        if (nodes[i]['id'] == id) return i;
    }
    return -1;
}

//节点点击事件
Topology.prototype.setNodeClickFn = function(callback) {
    this.clickFn = callback;
}

//更新拓扑图状态信息
Topology.prototype.update = function() {
    var link = this.vis.selectAll("line.link")
        .data(this.links, function(d) {
            return d.source.id + "-" + d.target.id;
        })
        .attr("class", function(d) {
            return d['source']['status'] && d['target']['status'] ? 'link' : 'link link_error';
        });

    link.enter().insert("svg:line", "g.node")
        .attr("class", function(d) {
            return d['source']['status'] && d['target']['status'] ? 'link' : 'link link_error';
        });

    link.exit().remove();

    var node = this.vis.selectAll("g.node")
        .data(this.nodes, function(d) {
            return d.id;
        });

    var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .call(this.force.drag);

    //增加图片，可以根据需要来修改
    var self = this;
    nodeEnter.append("svg:image")
        .attr("class", "circle")
        .attr("xlink:href", function(d) {
            //根据类型来使用图片
            if (d.server) {
                return "images/sm.png";
            } else if (d.expand) {
                return "images/mac.png";
            }else if (d.alarm) {
                return "images/alarm.png";
            } else if (d.alarm2) {
                return "images/alarm2.png";
            }else {
                return "images/site.png";
            }
        })
        .attr("x", "-32px")
        .attr("y", "-32px")
        .attr("width", "54px")
        .attr("height", "54px")
        .on('click', function(d) {
            d.expand && self.clickFn(d);
            d.expand2 && self.clickFn(d);
            d.alarm && self.clickFn(d);
            d.alarm2 && self.clickFn(d);
             // showTopoTemplate("topu");
        })

    nodeEnter.append("svg:text")
        .attr("class", "nodetext")
        .attr("style", "color:#fff")
        .attr("dx", 15)
        .attr("dy", -25)
        .text(function(d) {
            return d.id
        });


    node.exit().remove();

    this.force.start();
}



function expandNode(id) {
    topology.addLinks(childLinks);
    topology.update();
}

function collapseNode(id) {
    topology.removeChildNodes(id);
    topology.update();
}

/*卡*/
var cardObj = {
    imgX : function(i){
        var str = "";
        if (i == '0') {
            str = '<img style="width:20px;" src="images/gery.png" alt="" />';
        } else if (i == '1') {
            str = '<img style="width:20px;" src="images/green.PNG" alt="" />';
        } else if (i == '2') {
            str = '<img style="width:20px;" src="images/red.PNG" alt="" />';
        } else if (i == '3') {
            str = '<img style="width:20px;" src="images/yellow.png" alt="" />';
        } else if (i == '4') {
            str = '<img style="width:20px;" src="images/greent.gif" alt="" />';
        } else if (i == '5') {
            str = '<img style="width:20px;" src="images/redt.gif" alt="" />';
        } else if (i == '6') {
            str = '<img style="width:20px;" src="images/yellow.gif" alt="" />';
        }
        return str;
    },
    imgX1 : function(i){
        var str = "";
        if (i == '0') {
            str = '<img style="width:20px;" src="images/gery.png" alt="" />';
        } else if (i == '1') {
            str = '<img style="width:20px;" src="images/red.PNG" alt="" />';
        } else if (i == '2') {
            str += '<img style="width:20px;" src="images/green.PNG" alt="" />';
        } else if (i == '3') {
            str += '<img style="width:20px;" src="images/greent.gif" alt="" />';
        }
        return str;
    },

    cardNull : function(){
        var str = '';
            str +='<div class="fCenter-box-1" >'
            str +=    '<div class="fCenter-box1">'
            str +=        '<img src="images/card.PNG" alt="" />'
            str +=        '<div style=""></div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-2 container">'
            str +='</div>'
            str +='<div class="fCenter-box-3">'
            str +=    '<img src="images/zcardb2.PNG" alt=""/>'
            str +='</div>';
        return str;
    },
    cardCC : function(freeRun,active,lock,alarm){//钟卡 每种灯的范围0-6;
        var str = '';
            str +='<div class="fCenter-box-1" >'
            str +=    '<div class="fCenter-box1">'
            str +=        '<img src="images/zcard.PNG" alt="" />'
            str +=        '<div style="">钟卡</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-2 container">'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">freeRun</div>'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX(freeRun);
                        // '<img src="images/gery.gif" style="width: 20px;" alt="">'+
            str +=        '</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">active</div>'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX(active);
                        // '<img src="images/gery.gif" style="width: 20px;" alt="">'+
            str +=        '</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">lock</div>'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX(lock); 
                       // '<img src="images/gery.gif" style="width: 20px;" alt="">'+
            str +=        '</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">alarm</div>'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX(alarm);
                     // '<img src="images/gery.gif" style="width: 20px;" alt="">'+
            str +=        '</div>'
            str +=    '</div>'
            str +=    '<div class="fc-conPtp">'
            str +=        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">PTP1</div>'
            str +=        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 col-sm-offset-2">'
            str +=            '<img src="images/ptp.PNG" alt="" style="width: 40px;vertical-align:middle;">'
            str +=        '</div>'
            str +=    '</div>'
            str +=    '<div class="fc-conPtp">'
            str +=        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">PTP2</div>'
            str +=        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 col-sm-offset-2">'
            str +=            '<img src="images/ptp.PNG" alt="" style="width: 40px;vertical-align:middle;">'
            str +=        '</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-3">'
            str +=    '<img src="images/zcardb.PNG" alt=""/>'
            str +='</div>';
        return str;
    },
    cardMC : function(pwrA,pwrB,system,alarm){//管理卡 每种灯的范围范围 0-1 
        var str = '';
            str +='<div class="fCenter-box-1" >'
            str +=    '<div class="fCenter-box1">'
            str +=        '<img src="images/card.PNG" alt="" />'
            str +=        '<div style="">管理卡</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-2 container">'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX(pwrA);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">pwrA</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX(pwrB);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">pwrB</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX(system); 
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">sys</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX1(alarm);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">alarm</div>'
            str +=    '</div>'
            str +=    '<div class="fc-conMC">'
            str +=        '<img src="images/managecard.PNG" alt="" style="width: 40px;vertical-align:middle;">'
            str +=        '&nbsp;&nbsp;&nbsp;<span>管理网口</span>'
            str +=    '</div>'
            str +=    '<div class="fc-conMC1">'
            str +=            '<img src="images/craft.PNG" alt="" style="width: 40px;vertical-align:middle;">'
             str +=        '&nbsp;&nbsp;&nbsp;<span>Craft</span>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-3">'
            str +=    '<img src="images/zcardb2.PNG" alt=""/>'
            str +='</div>';
        return str;
    },
    cardGnss4E1 : function(sys,gnss,port1,port2,port3,port4){//GNSS+4E1 每种灯的范围范围 0-3 
        var str = '';
            str +='<div class="fCenter-box-1" >'
            str +=    '<div class="fCenter-box1">'
            str +=        '<img src="images/card.PNG" alt="" />'
            str +=        '<div style="">GNSS+4E1</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-2 container">'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX1(sys);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">Sys</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX1(gnss);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">PPS/TOD</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX1(port1); 
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">Input1</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX1(port2);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">Input2</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX1(port3);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">Input3</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX1(port4);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">Input4</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-3">'
            str +=    '<img src="images/zcardb2.PNG" alt=""/>'
            str +='</div>';
        return str;
    },
    cardBuffer : function(pwrA,pwrB,system,Active){//Buffer 每种灯的范围范围 0-3
        var str = '';
            str +='<div class="fCenter-box-1" >'
            str +=    '<div class="fCenter-box1">'
            str +=        '<img src="images/zcard.PNG" alt="" />'
            str +=        '<div style="">Buffer</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-2 container">'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX1(pwrA);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">PWR A</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX1(pwrB);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">PWR B</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX1(system);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">Sys</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX1(Active);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">Active</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-3">'
            str +=    '<img src="images/zcardb.PNG" alt=""/>'
            str +='</div>';
        return str;
    },
    cardPtp : function(PWR,Sys){//PTP输出卡 每种灯的范围范围 0-1
        var str = '';
            str +='<div class="fCenter-box-1" >'
            str +=    '<div class="fCenter-box1">'
            str +=        '<img src="images/card.PNG" alt="" />'
            str +=        '<div style="">PTP输出卡</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-2 container">'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">PWR</div>'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX(PWR); 
                       // '<img src="images/gery.gif" style="width: 20px;" alt="">'+
            str +=        '</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">Sys</div>'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            if (Sys == '1') {
                str += '               <img style="width:20px;" src="images/greent.gif" alt="" />';
            } else if (Sys == '0') {
                str += '               <img style="width:20px;" src="images/gery.png" alt="" />';
            }
                     // '<img src="images/gery.gif" style="width: 20px;" alt="">'+
            str +=        '</div>'
            str +=    '</div>'
            str +=    '<div class="fc-conPtp">'
            str +=        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">PTP1</div>'
            str +=        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 col-sm-offset-2">'
            str +=            '<img src="images/ptp.PNG" alt="" style="width: 40px;vertical-align:middle;">'
            str +=        '</div>'
            str +=    '</div>'
            str +=    '<div class="fc-conPtp">'
            str +=        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">PTP2</div>'
            str +=        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 col-sm-offset-2">'
            str +=            '<img src="images/ptp.PNG" alt="" style="width: 40px;vertical-align:middle;">'
            str +=        '</div>'
            str +=    '</div>'
            str +=    '<div class="fc-conPtp">'
            str +=        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">PTP3</div>'
            str +=        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 col-sm-offset-2">'
            str +=            '<img src="images/ptp.PNG" alt="" style="width: 40px;vertical-align:middle;">'
            str +=        '</div>'
            str +=    '</div>'
            str +=    '<div class="fc-conPtp">'
            str +=        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5">PTP4</div>'
            str +=        '<div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 col-sm-offset-2">'
            str +=            '<img src="images/ptp.PNG" alt="" style="width: 40px;vertical-align:middle;">'
            str +=        '</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-3">'
            str +=    '<img src="images/zcardb2.PNG" alt=""/>'
            str +='</div>';
        return str;
    },
    cardE1T1  : function(pwr, enable){//E1-T1 每种灯的范围范围 0-1
        var str = '';
            str +='<div class="fCenter-box-1" >'
            str +=    '<div class="fCenter-box1">'
            str +=        '<img src="images/card.PNG" alt="" />'
            str +=        '<div style="">E1输出卡</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-2 container">'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            str +=this.imgX(pwr);
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">PWR</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            if (enable == '1') {
                str += '               <img style="width:20px;" src="images/greent.gif" alt="" />';
            } else if (enable == '0') {
                str += '               <img style="width:20px;" src="images/gery.png" alt="" />';
            }
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">Enable</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-3">'
            str +=    '<img src="images/zcardb2.PNG" alt=""/>'
            str +='</div>';
        return str;
    },
    cardIrigAndPpsToD : function(pwr, enable){//IRIG  PPS-TOD pwr 0-1 enable 0-2
        var str = '';
            str +='<div class="fCenter-box-1" >'
            str +=    '<div class="fCenter-box1">'
            str +=        '<img src="images/card.PNG" alt="" />'
            str +=        '<div style="">PPS-TOD输出卡</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-2 container">'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            if (pwr == '1') {
                str += '               <img style="width:20px;" src="images/green.PNG" alt="" />';
            } else if (pwr == '0') {
                str += '               <img style="width:20px;" src="images/gery.png" alt="" />';
            }
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">PWR</div>'
            str +=    '</div>'
            str +=    '<div class="fc-con">'
            str +=        '<div class="col-lg-3 col-md-3 col-sm-3 col-xs-3">'
            if (enable == '1') {
                str += '               <img style="width:20px;" src="images/greent.gif" alt="" />';
            } else if (enable == '0') {
                str += '               <img style="width:20px;" src="images/gery.png" alt="" />';
            } else if (enable == '2') {
                str += '               <img style="width:20px;" src="images/green.PNG" alt="" />';
            }
            str +=        '</div>'
            str +=        '<div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">Enable</div>'
            str +=    '</div>'
            str +='</div>'
            str +='<div class="fCenter-box-3">'
            str +=    '<img src="images/zcardb2.PNG" alt=""/>'
            str +='</div>';
        return str;
    },
    choseCard : function(obj, type){
        var self = this;
        if(type === "CC"){
            return self.cardCC(obj.freeRun, obj.active, obj.lock, obj.alarm);
        }else if(type === "MC"){
            return self.cardMC(obj.pwrA, obj.pwrB, obj.system, obj.alarm);
        }else if(type === "4-E1"){
            return self.cardGnss4E1(obj.sys, obj.gnss, obj.port1, obj.port2, obj.port3, obj.port4);
        }else if(type === "PPS-TOD" || type === "IRIG"){
            return self.cardIrigAndPpsToD(obj.pwr, obj.enable);
        }else if(type === "E1-T1"){
            return self.cardE1T1(obj.pwr, obj.enable);
        }else if(type === "Buffer"){
            return self.cardBuffer(obj.powerA, obj.powerB, obj.sys, obj.active);
        }else if(type === "PTP"){
            return self.cardPtp(obj.pwr, obj.enable);
        }
    }
}
