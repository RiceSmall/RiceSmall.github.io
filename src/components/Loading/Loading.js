import React from "react"
import styles from './Loading.css'

var Loading=React.createClass({
	render:function(){
		return(
			<div className="block">
				<div className="circle">
					<div className="loadEffect">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
			)
	}
})

export default Loading;


