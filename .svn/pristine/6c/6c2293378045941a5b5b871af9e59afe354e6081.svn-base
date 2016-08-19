function jsPlumbas(sbNum, flag, editobj) {
    var instance = window.jsp = jsPlumb.getInstance({
        // default drag options
        DragOptions: {
            cursor: 'pointer',
            zIndex: 2000
        },
        // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
        // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
        ConnectionOverlays: [
            ["Arrow", {
                location: 1
            }],
            ["Label", {
                location: 0.5, //线上标号的位置
                id: "label",
                cssClass: "aLabel"
            }]
        ],
        Container: "canvas"
    });

    var basicType = {
        connector: "StateMachine",
        paintStyle: {
            strokeStyle: "white" /*, lineWidth: 1*/
        },
        hoverPaintStyle: {
            strokeStyle: "white"
        },
        overlays: [
            "Arrow"
        ]
    };
    instance.registerConnectionType("basic", basicType);

    // this is the paint style for the connecting lines..
    var connectorPaintStyle = {
            lineWidth: 1,
            strokeStyle: "#fff",
            joinstyle: "round",
            outlineColor: "white",
            outlineWidth: 2
        },
        // .. and this is the hover style.
        connectorHoverStyle = {
            lineWidth: 4,
            strokeStyle: "#216477",
            outlineWidth: 2,
            outlineColor: "white"
        },
        endpointHoverStyle = {
            fillStyle: "#216477",
            strokeStyle: "#216477"
        },
        // the definition of source endpoints (the small blue ones)
        sourceEndpoint = {
            endpoint: "Dot",
            paintStyle: {
                strokeStyle: "#fff",
                fillStyle: "transparent",
                radius: 5,
                lineWidth: 1
            },
            isSource: true,
            connector: ["Flowchart", {
                stub: [40, 60],
                gap: 10,
                cornerRadius: 1,
                alwaysRespectStubs: true
            }],
            maxConnections: 200,
            connectorStyle: connectorPaintStyle,
            hoverPaintStyle: endpointHoverStyle,
            connectorHoverStyle: connectorHoverStyle,
            dragOptions: {},
            overlays: [
                ["Label", {
                    location: [0.5, 1.5],
                    label: "",
                    cssClass: "endpointSourceLabel"
                }]
            ]
        },
        // the definition of target endpoints (will appear when the user drags a connection)
        targetEndpoint = {
            endpoint: "Dot",
            paintStyle: {
                fillStyle: "#fff",
                radius: 5 //实心圆点大小
            },
            hoverPaintStyle: endpointHoverStyle,
            maxConnections: 200,
            dropOptions: {
                hoverClass: "hover",
                activeClass: "active"
            },
            isTarget: true,
            overlays: [
                ["Label", {
                    location: [0.5, -0.5],
                    label: "",
                    cssClass: "endpointTargetLabel"
                }]
            ]
        },
        init = function(connection) {
            connection.getOverlay("label").setLabel(connection.sourceId + "-->" + connection.targetId);
        };

    var _addEndpoints = function(toId, sourceAnchors, targetAnchors) {
        for (var i = 0; i < sourceAnchors.length; i++) {
            var sourceUUID = toId + sourceAnchors[i];
            //sourceEndpoint.connectorStyle.strokeStyle = "blue";  改变线的颜色 。
            instance.addEndpoint(toId, sourceEndpoint, {
                anchor: sourceAnchors[i],
                uuid: sourceUUID
            });
        }
        for (var j = 0; j < targetAnchors.length; j++) {
            var targetUUID = toId + targetAnchors[j];
            instance.addEndpoint(toId, targetEndpoint, {
                anchor: targetAnchors[j],
                uuid: targetUUID
            });
        }
    };

    // suspend drawing and initialise.
    instance.batch(function() {
        $('.jsplumb-endpoint.jsplumb-endpoint-anchor,.jsplumb-overlay,svg').remove();
        for (var i = 0; i < sbNum.length; i++) {
           _addEndpoints(sbNum[i], ["TopCenter"], ["Center"]);
            /*初始化连线标题*/
            instance.bind("connection", function(connInfo, originalEvent) {
                init(connInfo.connection);
            });
        }

        /*排序*/
        var ch = $("#SbShowList").children("div"), _l = 0,  _h = 150, qj={},
            userid = localStorage.getItem("ownerId"),
            areaid = $('#fatherTree .tree-Mo').attr('id'),
            token = localStorage.getItem("token"),
            datas = $("#_tuopoData").val();
        if(datas){
            var dataO = JSON.parse(datas),
                ips = JSON.parse(dataO.data);
            for(var j in ips){
                for (var i = 0; i < ch.length; i++) {
                    if(j === ch.eq(i).attr("id") && ips[j].possion){
                        ch.eq(i).css({left : ips[j].possion.left + "px",top: ips[j].possion.top + "px"});
                    }
                }
                if(editobj){
                    if(ips[j].targetIds){
                        var _ar = ips[j].targetIds;
                        for (var s = 0; s < _ar.length; s++) {
                            if(editobj.ip == _ar[s].ip && editobj.slot == _ar[s].slot && editobj.port == _ar[s].port){
                                _ar.splice(s, 1);
                            }
                        }                        
                    }
                }
                if(ips[j].targetIds){
                    var s = tuopoz(j, arrayObjs(ips[j].targetIds));
                    line(s);
                }
            }
            if(editobj){
                dataO.data = JSON.stringify(ips);
                $("#_tuopoData").val(JSON.stringify(dataO))
                postRequestAjax("/nms/spring/viewData?token=" + token, JSON.stringify(dataO), function(){})
            }
        }
        if(flag){
            for (var i = 0; i < ch.length; i++) {
                _l = _l + 160;
                ch.eq(i).css({"left" : _l + "px","top": _h + "px"});
                qj[ch.eq(i).attr("id")] ={};
                qj[ch.eq(i).attr("id")].possion = {"left" : _l,"top": _h};
                if((i + 1) % 4 === 0){
                    _l = 0;
                    _h = _h + 90;
                }
            }
            var arrays = [], dd = {}, objs ={};
            if(datas !== "" && datas != undefined){
                objs = JSON.parse(datas);
                dd = JSON.parse(objs.data);
                for(var e in qj){
                    if(dd[e] && dd[e].possion){
                        dd[e].possion = qj[e].possion;
                    }else{
                        dd[e] = {};
                        dd[e]["possion"] = qj[e];
                    }
                }
                objs.data = JSON.stringify(dd);
               
            }else{
                objs.data = {};
                objs.data = JSON.stringify(qj)
                //objs.userId = userid;
                objs.userId = "";
                objs.areaId = areaid;
            }
            $("#_tuopoData").val(JSON.stringify(objs));
            if(localStorage.getItem('role') === '2') return;
            postRequestAjax("/nms/spring/viewData?token=" + token, JSON.stringify(objs), function(){})   

        }

        function arrayObjs(arr){
            var _a = [];
            if(arr.length > 0){
                for (var i = 0; i < arr.length; i++) {
                    _a.push(arr[i].ip);
                }
            }
            return _a.join(',');
        }
        // ch.mousedown(function(){
        //     updataTop()
        // })  
        ch.mouseup(function(e){
            if(localStorage.getItem('role') === '2') return;
            var self = $(this),
                userid = localStorage.getItem("ownerId"),
                areaid = $('#fatherTree .tree-Mo').attr('id'),
                token = localStorage.getItem("token"),
                _tuopoData = $("#_tuopoData").val(),
                ip = self.attr("id"),
                l = self[0].offsetLeft,
                t = self[0].offsetTop,
                d = {}, obj = {};
            if(_tuopoData !== ""){
                obj = JSON.parse(_tuopoData);
                d = JSON.parse(obj.data);
                if(d[ip] && d[ip].possion){
                    d[ip].possion = {left : l, top : t}
                }else{
                    d[ip] = {};
                    d[ip]["possion"] = {left : l, top : t}
                }
            }else{
                d[ip] = {};
                d[ip].possion = {left : l, top : t};
                //obj.userId = userid;
                obj.userId = "";
                obj.areaId = areaid;
            }
            obj.data = JSON.stringify(d);
            $("#_tuopoData").val(JSON.stringify(obj))
            postRequestAjax("/nms/spring/viewData?token=" + token, JSON.stringify(obj), function(){})

        })
        function tuopoz(s,t){
            var arr = [],
                ss = t.split(",")
            for (var i = 0; i < ss.length; i++) {
                arr.push(s + ',' + ss[i])
            }
            return arr;
        }
        function line(arr){
            for (var i = 0; i < arr.length; i++) {
                var j = arr[i].split(",");
                instance.connect({
                    uuids: [j[0] + "TopCenter", j[1] + "Center"],
                    editable: true
                });
            }
        }
        instance.bind("connection", function(connInfo, originalEvent) {
            init(connInfo.connection);
        });

        // make all the window divs draggable
        instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), {
            grid: [20, 20]
        });

        instance.bind("dblclick", function(conn, originalEvent) {
            // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
            //   instance.detach(conn);6
            if(conn.sourceId && conn.targetId){
                if(confirm("确认删除吗？")){
                    deleteLine(conn)
                    instance.detach(conn);
                }
                conn.toggleType("basic");
            }

        });

        instance.bind("connectionDrag", function(connection) {
            if(connection.targetId.indexOf("jsPlumb") === -1){
                deleteLine(connection)
            }
            console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
        });

        instance.bind("connectionDragStop", function(connection) {
            if(connection.targetId.indexOf("jsPlumb") > -1){
                $('#mymodal').hide();
                return;
            }
            if(connection.target === null){
                $('#mymodal').hide()
                deleteLine(connection)
                return;
            }
            $("#mymodal").modal();
            //$("#mymodal").css('margin-top','200px')
            _dailagWH(20,30);
            var str = "";
            str += '<div class="umar-a h-8h" style="margin-top:10px;">';
            str += '    <div class="w-full fa15x t-middle">';
            str += '        <span class="">槽位</span>';
            str += '        <input id="topoSlot" type="text"  class="w-half" style="margin-top: 33px;" /><span class="red fa12x" id="mesNa"></span><br><br>';;
            str += '        <span class="">端口</span>';
            str += '        <input id="topoPort" type="text"  class="w-half" style="margin-top: 3px;" /><span class="red fa12x" id="mesNa"></span><br><br>';;
            str += '        <div style="border-top:0;text-align:center;">';
            str += '            <button  type="button"  class="btn btn-primary" style="width: 70px;margin-top:0;" id="_subtopo">确认</button>';
            str += '        </div>';
            str += '    </div>';
            str += '</div>';
            $('#config_right').html(str);
            $("#myModalLabel").find('span').eq(1).hide();
            $("#configExport,#config_title").hide();

            $("#_subtopo").click(function(){
                var slot = $("#topoSlot").val(),
                    port = $("#topoPort").val();
                if(slot === "" || isNaN(slot)){
                    Dialog.init('请输入槽位！')
                    return;
                }
                if(port === "" || isNaN(port)){
                    Dialog.init('请输入端口！');
                    return;
                }

                var o = {}, o1 = {}, o2 = [],   
                    userid = localStorage.getItem("ownerId"),
                    areaid = $('#fatherTree .tree-Mo').attr('id'),
                    token = localStorage.getItem("token"),
                    targetId = connection.targetId,
                    sourceId = connection.sourceId,
                    dds = $("#_tuopoData").val();
                if(targetId.indexOf("jsPlumb") !== -1)return;
                //o.userId = userid;
                o.userId = "";
                o.areaId = areaid;
                if(dds !== ""){
                    o = JSON.parse(dds);
                    o1 = JSON.parse(o.data);
                    if(o1[sourceId]){
                        if(o1[sourceId].targetIds && o1[sourceId].targetIds.length > 0){
                            var _ars = o1[sourceId].targetIds, ja =[];
                            for (var i = 0; i < _ars.length; i++) {
                                ja.push(_ars[i].ip);
                            }
                            if($.inArray(targetId, ja) !== -1) return;
                            o1[sourceId].targetIds.push({port : port, slot : slot, ip : targetId});
                        }else{
                            var f = o1[sourceId].targetIds instanceof Array;
                            !f && (o1[sourceId].targetIds = []);
                            o1[sourceId].targetIds.push({port : port, slot : slot, ip : targetId});
                        }
                    }else{
                        o1[sourceId] = {};
                        o1[sourceId].targetIds = [];
                        o1[sourceId].targetIds.push({port : port, slot : slot, ip : targetId})
                    }
                    o.data = JSON.stringify(o1);
                }else{
                    o.data = {};
                    o.data[sourceId] = {};
                    o.data[sourceId].targetIds = [];
                    o.data[sourceId].targetIds.push({port : port, slot : slot, ip : targetId});
                    o.data = JSON.stringify(o.data)
                }
                $("#_tuopoData").val(JSON.stringify(o))
                postRequestAjax("/nms/spring/viewData?token=" + token, JSON.stringify(o), function(){
                    $("#mymodal").modal("hide");
                }) 
            })
            $('#mymodal').on('hidden.bs.modal', function (e) {
                if($("#topoSlot").val() === '' || $("#topoSlot").val() === ""){
                    loadSbShowList(true)
                    //Dialog.init('连线失败，请输入槽位和端口！')
                }
            })
        });

        instance.bind("connectionMoved", function(params) {
            console.log("connection " + params.connection.id + " was moved");
        });
    });
    jsPlumb.fire("jsPlumbDemoLoaded", instance);

};

function deleteLine(connection){
    var o = {}, o1 = {}, o2 = {},
        userid = localStorage.getItem("ownerId"),
        areaid = $('#fatherTree .tree-Mo').attr('id'),
        token = localStorage.getItem("token"),
        targetId = connection.targetId,
        sourceId = connection.sourceId,
        dds = $("#_tuopoData").val();
    //o.userId = userid;
    o.userId = "";
    o.areaId = areaid;
    o = JSON.parse(dds);
    o1 = JSON.parse(o.data);
    if(o1[sourceId].targetIds.length > 0){
        var t = o1[sourceId].targetIds;
        for (var i = 0; i < t.length; i++) {
            if(connection.targetId === t[i].ip){
                t.splice(i, 1);
            }
        }
    }
    // var t = o1[sourceId].targetIds.split(",");
    // t.splice(t.indexOf(connection.targetId), 1);
    // o1[sourceId].targetIds = t.join(",");
    o.data = JSON.stringify(o1);
    $("#_tuopoData").val(JSON.stringify(o));
    postRequestAjax("/nms/spring/viewData?token=" + token, JSON.stringify(o), function(){}); 
}
