import React, {Component} from 'react';
import { Iconwedd,Input} from '../../components/wirefragment';
import { Cell } from '../grid';
import { Grid } from '../../components';
import ReactHtmlPaser from 'react-html-parser'

class FaqList extends Component {	

	constructor(props){
		super();
		this.state = {
			list: 		props.list,
			searched: 	props.list,
			searchWord: ''
		}
		this.showList = this.showList.bind(this);
		this.hidelist = this.hidelist.bind(this);
	}

	showList(orden){
		let newList = this.state.searched;
		newList[orden].isOpen = 1;
		this.setState({
			searched: newList
		});
	}

	hidelist(orden){
		let newList = this.state.searched
		newList[orden].isOpen = 0;
		this.setState({
			searched: newList
		});
	}

	// Establecer la palabra a buscar, o regresar la lista completa de preguntas
	changeHandler = event => {
		const value = event.target.value;
		if (value === "") {

			let copy = this.state.list;
			const all = copy.map(element => element = { ...element, isOpen: 0 } );

			this.setState({
				searched: all
			});

		} else {
			
			let copy = this.state.list;
			const all = copy.map(element => element = { ...element, isOpen: 0 } );

			let list = all.filter(function(e){
				return e.title.toLowerCase().includes(value.toLowerCase());
			});

			this.setState({ searched: list });

		}
	}


	render(){ return(
		<section>
				<article className="movil">
					<article>
						<center>
							<div className="searchcont">
								<div className="searchword">
									<Input type={"text"} id="searchword" name={"searchWord"}  changeHandler={this.changeHandler} />
								</div>
								<div className="inputsearch">
									<Input type={"button"} id={"inputsearch"} value={ this.props.lang === "es" ? "Buscar" : "Search" } name="button" handleClick={this.handleSubmit}/>
								</div>
							</div>
						</center>
					</article>
					{this.state.searched.length !=0 ?
					<section className="bodyfaqs" id="content-all">
						 {this.state.searched.map((element,index) => {
						 	return(
						 			<section key={index}>
					 					{element.isOpen?
										<div className="faqContent"> 
											<Grid type="x"  className="openListFaq" onClick={this.hidelist.bind(element,index)}>
												<Cell small="11" large="11">
													<h2 className="subtitle ">
														{element.orden}.&nbsp;{element.title} 
												</h2>
												</Cell>
												<Cell small="1" large="1">
														<div className="spanFaq"> 
															<Iconwedd  icon={"chevron-up"} color={"pink"} />
														</div>
												</Cell>
											</Grid>
										 <div className="listContainer">
												<ul>
												{element.list.map((element,index) => {
													return (
														<li key={index}><p className="paragraph">{ReactHtmlPaser(element.text)}</p></li>
													)
												})}
												</ul>
											</div>
										</div>:
										<div className="faqContent">
					 						<Grid type="x" className="openListFaq" onClick={this.showList.bind(element,index)}>
												 <Cell small="11" large="11">
							 						<h2 className="subtitle ">
														{element.orden}.&nbsp;{element.title}
													</h2>
												</Cell>
												<Cell small="1" large="1">
													<div className="spanFaq"> 
														<Iconwedd  icon={"chevron-down"} color={"pink"} />
													</div>
												</Cell>
					 						</Grid>
										</div>
					 					}
						 			</section>
						 		)
						 })}
						</section>:
						<section >
							<h2 className="subtitle  ">
								No matching results found
							</h2>
						</section>
					}
				</article>
				<article className="desktop">
					<article className="container" style={{paddingBottom: "90px"}}>
						<center>
							<div className="searchcont">
								<Input type={"text"} name={"search"}  changeHandler={this.changeHandler} />
								<Input type={"button"} value={ this.props.lang === "es" ? "Buscar" : "Search" } name="button" handleClick={this.handleSubmit}/>
							</div>
						</center>
						{this.state.searched.length !=0 ?
							<center>
								<Grid type="x">
									<Cell large="6" small="6">
											{this.state.searched.map((element,index) => {
												return(
												<section key={index}>
												{element.orden<=(this.state.searched.length/2)?
													<article>
														{element.isOpen?
														<article onClick={this.hidelist.bind(element,index)}>
															<div className="openListFAQ">
															 <h2 className="subtitle subtitleS" >
																	{element.orden}. 
																</h2>
																<h2 className="subtitle subtitleS subtitleFAQ" >
																	{element.title}
																</h2>
																<div className="chevronFAQleft">
																	<Iconwedd  icon={"chevron-up"} color={"pink"} />
																</div>
															</div>
															<div className="listContainerFAQ">
																<ul>
																{element.list.map((element,index) => {
																	return (
																		<li key={index}><p className="paragraph">{ReactHtmlPaser(element.text)}</p></li>
																	)
																})}
																</ul>
															</div>
														</article>:
														<article  onClick={this.showList.bind(element,index)}>
															<div className="openListFAQ">
																<h2 className="subtitle subtitleS" >
																	{element.orden}. 
																</h2>
																<h2 className="subtitle subtitleS subtitleFAQ" >
																	{element.title}
																</h2>
																<div className="chevronFAQleft">
																	<Iconwedd  icon={"chevron-down"} color={"pink"} />
																</div>
															</div>
														</article>
														}
													</article>:""
												}
												</section>)
											})}
									</Cell>
									<Cell large="6" small="6">
										<article style={{paddingLeft: "60px"}}>
										{this.state.searched.map((element,index) => {
											return(
												<section key={index}>
											{element.orden>(this.state.searched.length/2)?
												<article>
													{element.isOpen?
														<article onClick={this.hidelist.bind(element,index)}>
															<div className="openListFAQ">
																<h2 className="subtitle subtitleS" >
																	{element.orden}. 
																</h2>
																<h2 className="subtitle subtitleS subtitleFAQ" >
																	{element.title}
																</h2>
																<div className="chevronFAQright">
																	<Iconwedd  icon={"chevron-up"} color={"pink"} />
																</div>
															</div>
															{/*<div className={"grislargoRight " +element.extraClass}></div>*/}
															<div className="listContainerFAQ">
																<ul>
																{element.list.map((element,index) => {
																	return (
																		<li key={index}><p className="paragraph">{ReactHtmlPaser(element.text)}</p></li>
																	)
																})}
																</ul>
															</div>
														</article>:
														<article  onClick={this.showList.bind(element,index)}>
															<div className="openListFAQ">
																<h2 className="subtitle subtitleS" >
																	{element.orden}. 
																</h2>
																<h2 className="subtitle subtitleS subtitleFAQ" >
																	{element.title}
																</h2>
																<div className="chevronFAQright">
																	<Iconwedd  icon={"chevron-down"} color={"pink"} />
																</div>
															</div>
														</article>
													}
												</article>:""
											}
												</section>)
										})}
										</article>
									</Cell>
								</Grid>
							</center>:
							<center>
								<h2 className="subtitle subtitleS">
									No matching results found
								</h2>
							</center>
						}
					</article>
				</article>
		</section>
	)}
};

export default FaqList;