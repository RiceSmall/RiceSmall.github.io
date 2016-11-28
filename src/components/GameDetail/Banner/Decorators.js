import React, { PropTypes, Component } from 'react'

export default [
	{component: React.createClass({
			render() { return <div></div> }
		})
	},
	{component: React.createClass({
			render() { return <div></div> }
		})
	},
	{component: React.createClass({
			getIndex (flag){
				let t = (this.props.currentSlide==flag)
				return {'marginLeft':'.1rem','listStyleType': 'none','display': 'inline-block ','opacity':t?'1':'.5'}
			},
			render() {
				let self = this;
				return (
					<ul style={{'position': 'relative',
											'margin': 0,'top': 0,'padding': 0,
											'fontSize': '.1rem','color': '#FFFFFF'}}>
						<li onClick={self.props.goToSlide.bind(null, 0)} style={self.getIndex.call(self,0)}>▂</li>
						<li onClick={self.props.goToSlide.bind(null, 1)} style={self.getIndex.call(self,1)}>▂</li>  
					</ul>
				)
			}		   
		}),
		position: 'BottomCenter'
	}]