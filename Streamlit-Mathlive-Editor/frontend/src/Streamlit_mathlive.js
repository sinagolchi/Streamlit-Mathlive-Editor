import './Streamlit_mathlive.css'
import React from 'react'
import {Streamlit, StreamlitComponentBase, withStreamlitConnection } from "streamlit-component-lib"


// Use &#123; and &#125; to escape { and } in JSX

class Streamlit_mathlive extends StreamlitComponentBase {
  
  constructor(props) {
    super(props)
    this.mf = React.createRef()
    this.state = {upright:this.props.args['upright'], value:this.props.args['value'],tex:this.props.args['value'], mathml:window.MathJax.tex2mml(this.props.args['value'],{em: 14, ex: 7, display: true})}
	if (this.props.args['edit']){
	Streamlit.setComponentValue([this.state.tex,this.state.mathml])}
	this.edit = this.props.args['edit']
	Streamlit.setFrameHeight()
  }

  //   static getDerivedStateFromProps(props, state) {
  //   return {value: props.args["value"]};
  // }

  // const theme = renderData.theme
  // const style = {}
  //
  // // Maintain compatibility with older versions of Streamlit that don't send
  // // a theme object.
  // if (theme) {
  //   // Use the theme object to style our button border. Alternatively, the
  //   // theme style is defined in CSS vars.
  //   const borderStyling = `1px solid ${isFocused ? theme.primaryColor : "gray"}`
  //   style.border = borderStyling
  //   style.outline = borderStyling
  // }

  // Customize the mathfield when it is mounted

  componentDidMount(){
    // Read more about customizing the mathfield: https://cortexjs.io/mathlive/guides/customizing/
	if (this.props.args['edit']) {
		this.mf.current.smartFence = true
		this.mf.current.mathVirtualKeyboardPolicy = "sandboxed";
		window.mathVirtualKeyboard.visible = true;
		// This could be an `onInput` handler, but this is an alternative
		this.mf.current.addEventListener('input', (evt) => {
		  // When the return key is pressed, play a sound
		  if (evt.inputType === 'insertLineBreak') {
			// The mathfield is available as `evt.target`
			// The mathfield can be controlled with `executeCommand`
			// Read more: https://cortexjs.io/mathlive/guides/commands/
			evt.target.executeCommand('plonk')
		  }
		})
     }
  }

  change_val = (evt) => {
     this.setState(
      { value: evt.target.value, tex: this.state.upright ? "\\mathrm{" + evt.target.value + "}" : evt.target.value  , mathml: window.MathJax.tex2mml(this.state.upright ? "\\mathrm{" + evt.target.value + "}" : evt.target.value,{em: 14, ex: 7, display: true})},
      () => Streamlit.setComponentValue([this.state.tex,this.state.mathml])
    )
    this.mf.current.value = this.state.value

    if(typeof window.MathJax !== "undefined"){
	    window.MathJax.typesetClear()
      window.MathJax.typeset()
    }
  }
  
  handle_check = () => {
	this.setState(
      {upright:!this.state.upright})
	this.setState(
      {tex: this.state.upright ? "\\mathrm{" + this.state.value + "}": this.state.value , mathml: window.MathJax.tex2mml(this.state.upright ? "\\mathrm{" + this.state.value + "}" : this.state.value ,{em: 14, ex: 7, display: true})},
      () => Streamlit.setComponentValue([this.state.tex,this.state.mathml])
    )
  }
  
	
  render() {
	if (this.props.args['edit']) {
    return (
      <div className='App'>
        <h2>{this.props.args['title']}</h2>
        <math-field ref={this.mf} onInput={(evt) => {this.change_val(evt)}}>
          {this.state.value}
        </math-field>
		
		<div class="form-check">
		  <input class="form-check-input" type="checkbox" onChange={()=> this.handle_check()} checked={this.state.upright} id="upright1"/>
		  <label class="form-check-label" for="upright1">
			Upright equation
		  </label>
		</div>
		<h4>{this.state.upright}</h4>
        <div class="h-100 p-2 bg-body-tertiary border rounded-3">{this.state.tex}</div>
		<h5>Render preview of MathML</h5>
        <h2 dangerouslySetInnerHTML={{ __html: this.state.mathml }} />
		<break/>
      </div>
    )
  } else {
	  return(<div></div>)
  }
  }
}

export default withStreamlitConnection(Streamlit_mathlive)
