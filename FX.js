(()=>{var FX={
        easing:{
            linear:function(progress){return progress},
            quadratic:function(progress){return Math.pow(progress,2)},
            swing:function(progress){return 0.5-Math.cos(progress*Math.PI)/2},
            circ:function(progress){return 1-Math.sin(Math.acos(progress))},
            back:function(progress,x){return Math.pow(progress,2)*((x+1)*progress-x)},
            bounce:function(progress){for(var a=0,b=1,result;1;a+=b,b/=2){if(progress>=(7-4*a)/11){return -Math.pow((11-6*a-11*progress)/4,2)+Math.pow(b,2)}}},
            elastic:function(progress,x){return Math.pow(2,10*(progress-1))*Math.cos(20*Math.PI*x/3*progress)}
        },
		resources:{
			lerp:function(a,b,u){return (1-u)*a+u*b},
			sleep:function(ms){return new Promise(resolve=>setTimeout(resolve,ms))}
		},
		elem:{id:function(id){return document.getElementById(id)}},
        animate:function(options){
            var start=new Date
            var id=setInterval(function(){
                var timePassed=new Date-start
                var progress=timePassed/options.duration
                if(progress>1){progress=1}
                options.progress=progress
                var delta=options.delta(progress)
                options.step(delta)
                if(progress==1){
                    clearInterval(id)
                    if(options.complete!=undefined)options.complete()
                }
            },options.delay||10)
        },
        fadeOut:function(element,options){
            var to=1
            this.animate({
                duration:options.duration,
                delta:function(progress){
                    progress=this.progress
                    return FX.easing.swing(progress)
                },
                complete:function(){
					element.style.display='none'
					options.complete
				},
                step:function(delta){element.style.opacity=to-delta}
            })
        },
        fadeIn:function(element,options){
            var to=0
			element.style.display='block'
			element.style.opacity=0
            this.animate({
                duration:options.duration,
                delta:function(progress){
                    progress=this.progress
                    return FX.easing.swing(progress)
                },
                complete:options.complete,
                step:function(delta){element.style.opacity=to+delta}
            })
        },
		fadeAnimation:function(element,property,start,end,duration){
			var interval=10,steps=duration/interval,step_u=1.0/steps,u=0.0
			var theInterval=setInterval(function(){
				if(u>=1.0)clearInterval(theInterval)
				var r=parseInt(FX.resources.lerp(start.r,end.r,u))
				var g=parseInt(FX.resources.lerp(start.g,end.g,u))
				var b=parseInt(FX.resources.lerp (start.b,end.b,u))
				var colorname=`rgb(${r},${g},${b})`
				element.style.setProperty(property,colorname)
				u+=step_u
			},interval)
		}
    }
    window.FX=FX
})()