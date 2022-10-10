import React, {Component} from 'react';

class Barprogress extends Component{
    sizeProgress=0
    constructor(){
        super();
        this.barSize = this.barSize.bind(this);
        this.reProgressDesk = React.createRef()
        this.reProgressMov = React.createRef()
    }
    componentDidMount(){
    }
    barSize(){
        let sizefont=parseInt(window.getComputedStyle(document.body).fontSize.substring(-2,2))
        let progres=[]
        if(this.reProgressDesk.current!=null){
            this.reProgressDesk.current.style="width:"+(50*(this.props.progress+1))+"px;"
        }

        if(this.reProgressMov.current!=null){
            this.reProgressMov.current.style="width:"+(25*(this.props.progress+1)/16)+"rem;"
        }
        for(let i=0;i<this.props.size;i++){
            progres.push(<div key={i} className={"block-progress "+((i)<=this.props.progress?"active-prg":"")}><div className="pointer"></div></div>)
        }
        return (progres)
    }

    render() {
        return(
            <section component="barprogress">
                <div className="container progress-container" >
                    <div className="progress-bar">
                        <div className="progress desktop" ref={this.reProgressDesk}/>
                        <div className="progress movil" ref={this.reProgressMov}/>
                        {this.barSize()}
                    </div>
                </div>
            </section>
        )
    }
}
export default Barprogress;