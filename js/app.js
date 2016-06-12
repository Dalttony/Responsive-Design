var ImagenPerfil = React.createClass({

	render:function(){
		var imgstyle = {
			width:this.props.width
		};
		return <img src={this.props.img} />
	}
});
var Detail = React.createClass({
	render:function(){
		return (<div className="detail" id={"dt-"+this.props.dataDetail.id}>
				<ImagenPerfil img={this.props.dataDetail.image}/>
				<div>
					<span>{this.props.dataDetail.title}</span>
					<p>{this.props.dataDetail.content}</p>
				</div>
			</div>);
	}
});
var Bar = React.createClass({
	onClick:function(evt){
		var self = this;
		$("#loader").css("display","flex");
  		setTimeout(function(){
  				$.getJSON(self.props.url,function(dt){
  				self.props.onData(dt);
  				$("#loader").css("display","none");
			});
  		},3000);
	},
	render:function(){
		return (<div id="bar">
				<img src="img/ic_menu_white_24dp_2x.png" onClick={this.onClick} />
				<span id="title"></span>
			</div>);
	}
});
var Context = React.createClass({
	render:function(){
		var res = this.props.dataset;
		var i=0;
		return(<div id="context">
			<div id="loader">
				<span></span>
				<span></span>
			</div>
			{res.map(function(r,id){
					var caset = r.title.toLocaleLowerCase();
					var content = r.content.toLocaleLowerCase();
					title = caset[0].toLocaleUpperCase()+caset.slice(1,caset.length).toLocaleLowerCase();
					content = content[0].toLocaleUpperCase()+content.slice(1,content.length).toLocaleLowerCase()
					return <List key={id} title={title} content={content} image={r.image} identify={r.id}/>
				
			})}
			</div>);
	}
});
var List = React.createClass({
	onClick:function(evt){
		
		if(evt.target.parentElement.id.length >= 1){
			if($("#dt-"+evt.target.parentElement.id).hasClass("animationdetail")){
				$("#title").removeClass("animated bounceInDown");
				$("#dt-"+evt.target.parentElement.id).removeClass("animationdetail");
				$("#dt-"+evt.target.parentElement.id).addClass("animationdetailup");
				var obj = evt.target.parentElement.id;
				var ele = evt.target.parentElement;
				ele.style.marginBottom="0px";
				$("#title").addClass("animated bounceOutLeft");
				setTimeout(function(){
					$("#dt-"+obj).css("display","none");
					$("#dt-"+obj).removeClass("animationdetailup");
					ele.style.marginBottom="5px";
				},1000);
			}else{
				$(".detail").css("display","none");
				$("#title").removeClass("animated bounceOutLeft");
				$("#title").text($("#"+evt.target.parentElement.id).children()[1].textContent);
				$("#title").addClass("animated bounceInDown");
				$("#dt-"+evt.target.parentElement.id).css("display","flex");
				$("#dt-"+evt.target.parentElement.id).addClass("animationdetail");
				$("#dt-"+evt.target.parentElement.id).children().attr("class","animationdetailchild");	
				
			}
		}
	},
	render:function(){
		var color = [
			"#E2E2E2",
			"#FFFF11",
			"#00CC00",
			"#1F11C6",
			"#FF8000",
			""
		];
		var ln = Math.floor(Math.random()*(5-0)+0);
		console.log(ln);
		var bordestyle = {
			
		}
		return (<div>
				<div className="list animation" onClick={this.onClick} id={this.props.identify} style={{borderBottom:"2px solid "+color[ln]}}>
					<ImagenPerfil img={this.props.image}/>
					<p>{this.props.title}</p>
				</div>
				<Detail dataDetail={{
					title:this.props.title,
					content:this.props.content,
					image:this.props.image,
					id:this.props.identify
				}}/>
				</div>
				);
	}
});
var Container = React.createClass({
	getInitialState: function() {
    	return {data: []};
  	},
  	componentDidMount:function(){
  	},
  	componentWillMount:function(){
  		
  	},
  	onData:function(dt){
  		var self = this;
  			var i=0;
  			var len = dt.length;
  			var crak = setInterval(function(){
  				i++;
  				i==len&&clearInterval(crak)
  				self.setState({data: self.state.data.concat(dt.splice(0,1))});
  			},100);
  	},
	render:function(){
		return (
			<div id="container">
			<Bar url={this.props.dataUrl} onData={this.onData}/>
			<Context dataset={this.state.data}/>
			</div>
				)
	}
});


var UI = {
	onrender:function(url){
		ReactDOM.render(<Container dataUrl={url}/>,document.getElementById("body"));
	}
}


UI.onrender("news_mock.json");




