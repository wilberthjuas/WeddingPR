import React,{Component} from 'react';
import { Cell } from '../grid';
import { Grid } from '../../components';
import { Titlesection } from '../../components/wirefragment';

class StepQuiz extends Component {
    constructor(props) {
        super()
        this.elements = props.state
        this.state = {
            title:"",
            subtitle:"",
            description: "",
            description2: "",
            description3: "",
            descriptionImage:"",
            quizTitle:"",
            showButtonNext:false,
            showButtonBack:false,
            quizImageCheck:[],
            quizForm:[]
        }
        this.index = 0
        this.startQuiz = this.startQuiz.bind(this);
        this.nextQuiz = this.nextQuiz.bind(this);
        this.previousQuiz = this.previousQuiz.bind(this);
        
    }

    startQuiz(){
        this.setState({
            title:this.elements[this.index].title,
            subtitle:this.elements[this.index].subtitle,
            description: this.elements[this.index].description,
            description2: this.elements[this.index].description2,
            description3: this.elements[this.index].description3,
            descriptionImage:this.elements[this.index].descriptionImage,
            quizTitle:"",
            showButtonNext: false,
            showButtonBack:false,
            quizImageCheck:[],
            quizForm:[]
        });
        setTimeout(function(){
            this.setState({
                title:"",
                subtitle:"",
                description: "",
                description2: "",
                description3: "",
                descriptionImage:"",
                quizTitle:this.elements[this.index].quiz.quizTitle,
                showButtonNext: true,
                showButtonBack:true,
                quizImageCheck:this.elements[this.index].quiz.quizImageCheck,
                quizForm:this.elements[this.index].quiz.quizForm
            });
        }.bind(this),2000)

    }

    nextQuiz(){
        if(this.index < (this.elements.length-1)){
            this.index++
            this.setState({
                title:this.elements[this.index].title,
                subtitle:this.elements[this.index].subtitle,
                description: this.elements[this.index].description,
                description2: "",
                description3:"",
                descriptionImage:this.elements[this.index].descriptionImage,
                quizTitle:"",
                showButtonNext: false,
                showButtonBack:false,
                quizImageCheck:[],
                quizForm:[]
            });
            setTimeout(function(){
                this.setState({
                    title:"",
                    subtitle:"",
                    description: "",
                    description2: "",
                    description3: "",
                    descriptionImage:"",
                    quizTitle:this.elements[this.index].quiz.quizTitle,
                    showButtonNext: true,
                    showButtonBack:true,
                    quizImageCheck:this.elements[this.index].quiz.quizImageCheck,
                    quizForm:this.elements[this.index].quiz.quizForm
                });
            }.bind(this),2000)
        }
    }

    previousQuiz(){
        if(this.index >0){
            this.index--
            this.setState({
                title:"",
                subtitle:"",
                description: "",
                description2: "",
                description3: "",
                descriptionImage:"",
                quizTitle:this.elements[this.index].quiz.quizTitle,
                showButtonNext: true,
                showButtonBack:true,
                quizImageCheck:this.elements[this.index].quiz.quizImageCheck,
                quizForm:this.elements[this.index].quiz.quizForm
            });
        }
    }

    componentDidMount() {
        this.startQuiz();
    }

    render(){
        
            return (
                    <article>
                        <center>
                            <Titlesection
                               title={this.state.title}
                               subtitle={this.state.subtitle}
                               description={this.state.description+this.state.description2+this.state.description3}  
                               typeElement={""}
                               icon={""}/>
                            {this.state.descriptionImage?<img className="descriptionImage" src={this.state.descriptionImage}/>:""}
                        </center>
                        <Titlesection
                           subtitle={this.state.quizTitle}/>
                        <Grid type="x">
                        {
                            this.state.quizImageCheck.map((element,index) =>{
                                return( 
                                <Cell large="6" small="6" key={index}> 
                                    <article className="quizContent">
                                        <img className="imageQuiz" src={element.mobileImage}/>
                                        {/*<div className="checkBoxLateral"></div>
                                        <div className="checkBoxLateralChecked"></div>*/}
                                        <h3 className="subtitle Honeymoon">{element.title}</h3>
                                    </article>
                                </Cell>)
                            })
                        }
                        </Grid>
                        <article>
                        {
                            this.state.quizForm.map((element,index) =>{
                            return(
                                <div key={index} className="">
                                    <label>{element.label}</label>
                                    {element.type == 1?
                                        <input className="inputweddings"  type="text"></input>:""
                                    }
                                    {element.type == 2?
                                        <select className="" type="text"></select>:""
                                    }
                                    
                                </div>  
                            )})
                        }
                        </article>
                        <article className="separator-ttl-sbttl"></article>
                        <article className="quiz">
                        {this.state.showButtonNext?
                            <button className="btn btn5" onClick={this.nextQuiz}>Continue</button>:""
                        }
                        </article>
                        {this.state.showButtonBack?
                            <article className="backButton" onClick={this.previousQuiz}>Back</article>:""
                        }
                    </article>
            )
        
        return(
            <section component="StepQuiz">
                {head}
            </section>
        )
    }
}
export default StepQuiz;