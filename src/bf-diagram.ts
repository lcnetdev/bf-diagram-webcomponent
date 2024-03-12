import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'


const BASE_INSTANCE_URL = "/instances/"
const BASE_WORK_URL = "/works/"
const IGNORE_COMMON_PREDICATES = ['type','date','value','qualifier','label']


// interface textLayout {
//   indent: number,
//   text: string
// }
interface aResources {
  id: string,
  parts: ResourcesLine[],
  type: string  
}

interface Resources {
  instances: aResources[],
  works: aResources[]
}

interface ResourcesLine {
  indent: number,
  type: string,
  html: object
}



@customElement('bf-diagram')
export class BfDiagram extends LitElement {


  // optional (1 of the 3 req) the text heading to lookup the LCCN to lookup the Qid
  @property({ type: String }) instances = ""
  @property({ type: String }) works = ""
  

  @state() stateval: string = ""

  @state() resources: Resources = {instances:[],works:[]}

  

  

  constructor() {
    super();
  
    // we are setting the default values, will get overwritten by the attribute properties if provided
    this.instances = "22181412,22183166"
    this.works = "22181412"

  }

  connectedCallback() {
    super.connectedCallback()  
    
  }
  // willUpdate(changedProperties: PropertyValues<this>) {
  //   
  // }

  updated() {
    // changedProperties: Map<string, any>
    // if (changedProperties.has('collapsed')) {
      
      setTimeout(() => {
        if (this.shadowRoot){
          let container = this.shadowRoot.querySelector('#bf-diagram-container')
          if (container){
            
            console.log(container.clientHeight)

            let allInstanceDivs = this.shadowRoot.querySelectorAll('.instance')
            let offSetTop = 0
            let runningTop = 0
            let instancesData = []
            for (let [i, iEl] of allInstanceDivs.entries()){
              var iStyle = window.getComputedStyle(iEl)

              if (parseFloat(iStyle.marginTop) != 0){
                offSetTop = parseFloat(iStyle.marginTop)
                runningTop = runningTop + offSetTop
              }

              instancesData.push({
                height:parseFloat(iStyle.height),
                middle: parseFloat(iStyle.height)/2,
                id:i,
                runningTop: runningTop               
              })

              runningTop = runningTop + parseFloat(iStyle.height)
            }

            for (let i of instancesData){

              let svg = this.shadowRoot.querySelector<HTMLElement>(`#instance-${i.id}-svg`)
              if (svg){
                svg.style.display='block'
                svg.style.top = i.runningTop + (i.middle / 2) + 'px'
              }


            }

            let firstWork = this.shadowRoot.querySelector<HTMLElement>(`.work:first-of-type `)

            if(firstWork){
              firstWork.style.marginTop = container.clientHeight / 2 + 'px'
              
            }


            console.log(offSetTop)
            console.log(instancesData )

          }
        }
      });
      
    // }
  }


_extractLabelDescriptionFromXmlRDF(xmlStr: string, url: string){

  let useLabel = null
  let useDesc = null

  let doc = new DOMParser().parseFromString(xmlStr, 'text/xml');
  let rootNode = doc.documentElement;
  let evaluator = new XPathEvaluator();
  let resolver = evaluator.createNSResolver(rootNode);  

  if (url.indexOf('/resources/')>-1){

    let result1 = doc.evaluate('//bf:mainTitle', rootNode, resolver, XPathResult.ANY_TYPE, null);
    let results = []
    let node = null
    while ((node = <HTMLElement> result1.iterateNext())) {
      results.push(node);
    }  
    if (results.length>0){    
      useLabel = results[0].innerHTML    
    }



  }else{

    let result1 = doc.evaluate('//rdfs:label', rootNode, resolver, XPathResult.ANY_TYPE, null);
    let results = []
    let node = null
    while ((node = <HTMLElement> result1.iterateNext())) {
      results.push(node);
    }  
  
  
    if (results.length>0){    
        useLabel = results[0].innerHTML    
    }else{
  
      let result1 = doc.evaluate('//skos:prefLabel', rootNode, resolver, XPathResult.ANY_TYPE, null);
      let results = []
      let node = null
      while ((node = <HTMLElement> result1.iterateNext())) {
        results.push(node);
      }  
      if (results.length>0){    
        useLabel = results[0].innerHTML    
        
      } 
  
    }

  }





  let result1 = doc.evaluate('//skos:definition', rootNode, resolver, XPathResult.ANY_TYPE, null);
  let results = []
  let node = null
  while ((node = <HTMLElement> result1.iterateNext())) {
    results.push(node);
  }  
  if (results.length>0){    
    useDesc = results[0].innerHTML    
  }
  
  console.log(url)
  console.log({label: useLabel, desc: useDesc, url:url})

  return {label: useLabel, desc: useDesc, url:url}

 

}


_returnDereferenceInfo(id: string | undefined, key:string) {
  if (!id){
    return ''
  }
  let x = window.sessionStorage.getItem(id)
  if (x === 'pending'){return ''}
  if (x){
    return JSON.parse(x)[key]
  }else{
    return ''
  }
}




_dereference(id: string, type: string){
  
  
  // skip some common values
  if (type === 'predicate' && IGNORE_COMMON_PREDICATES.indexOf(id) > -1){
    return true
  }

  // before we request it check the session storage to see if we need to check, even if it is pending we don't continue
  if (window.sessionStorage.getItem(`bf-diagram-${type}-${id}`)){
    return true
  }else{
    window.sessionStorage.setItem(`bf-diagram-${type}-${id}`, 'pending')
  }
  
  // okay make the request off first check BF ontology and then move to blfc for properties
  if (type === 'predicate' || type === 'class' || type === 'ontologies'){

    let shortId = id.split('/').pop()

    let bfUri = `https://id.loc.gov/ontologies/bibframe/${shortId}`
    let bflcUri = `https://id.loc.gov/ontologies/bflc/${shortId}`
    
    let url
    fetch(bfUri, {
      method: "GET"
    })
    .then( async (bfResponse) => {
      if (bfResponse.status === 200){
        let xml = await bfResponse.text()
        if (type==='class' || type==='ontologies'){
          url = `https://id.loc.gov/ontologies/bibframe.html#c_${shortId}`
        }else{
          url = `https://id.loc.gov/ontologies/bibframe.html#p_${shortId}`
        }
        let labelDesc = this._extractLabelDescriptionFromXmlRDF(xml, url)
        window.sessionStorage.setItem(`bf-diagram-${type}-${id}`, JSON.stringify(labelDesc))
        this.requestUpdate()
      }else{
        throw 'non-200'
      }
      
    }).catch((error) => {
      console.log(error)
      fetch(bflcUri, {
        method: "GET"
      })
      .then( async (bfResponse) => {
        if (bfResponse.status === 200){
          let xml = await bfResponse.text()
          if (type==='class' || type==='ontologies'){
            url = `https://id.loc.gov/ontologies/bflc.html#c_${shortId}`
          }else{
            url = `https://id.loc.gov/ontologies/bflc.html#p_${shortId}`
          }          

          // if (type === 'class

          let labelDesc = this._extractLabelDescriptionFromXmlRDF(xml, url)
          window.sessionStorage.setItem(`bf-diagram-${type}-${id}`, JSON.stringify(labelDesc))
          this.requestUpdate()
        }
      })
      .catch((error2) => {
        console.error(error2)
      })
  

    });
    


  }else if (type === 'vocabulary' || type === 'authorities' || type === 'agents'){

    console.log("GETTING ",id + '.skos.rdf')
    fetch(id + '.skos.rdf', {
      method: "GET"
    })
    .then( async (idResponse) => {
      if (idResponse.status === 200){
        let xml = await idResponse.text()
        let url = id
        let labelDesc = this._extractLabelDescriptionFromXmlRDF(xml, url)
        // labelDesc.desc = labelDesc.desc + " (vocab. resource)"

        console.log(`bf-diagram-${type}-${id}`)
        window.sessionStorage.setItem(`bf-diagram-${type}-${id}`, JSON.stringify(labelDesc))
        this.requestUpdate()
      }else{
        throw 'non-200'
      }
      
    }).catch((error) => {
      console.error(error)
    })



  }else if (type === 'resources'){

    
    fetch(id + '.rdf', {
      method: "GET"
    })
    .then( async (idResponse) => {
      if (idResponse.status === 200){
        let xml = await idResponse.text()
        let url = id
        let labelDesc = this._extractLabelDescriptionFromXmlRDF(xml, url)
        // labelDesc.desc = labelDesc.desc + " (resource)"
        
        window.sessionStorage.setItem(`bf-diagram-${type}-${id}`, JSON.stringify(labelDesc))
        this.requestUpdate()
      }else{
        throw 'non-200'
      }
      
    }).catch((error) => {
      console.error(error)
    })



  }



  


  

}



_mouseOverToolTip(e: Event){

  // if (e.target){
  //   e.target.dataset.tip="HELLO"
  // }
  if (e !== null && e.target instanceof HTMLElement) {
    
    let label = this._returnDereferenceInfo( e.target.dataset.derefid , 'label')
    let desc = this._returnDereferenceInfo( e.target.dataset.derefid , 'desc') 
    let url = this._returnDereferenceInfo( e.target.dataset.derefid , 'url')
    
    if (label != ''){
      let tip = label
      if (desc){
        tip = tip + ` -- ${desc}`
      }
      
      e.target.dataset.tip = tip
      e.target.setAttribute('href',url)
    }else{
      e.target.classList.remove('tool')
    }

  }




}


_processTxt(txt: string[]): ResourcesLine[]{

  
  // let x = html`hello`
  // 
  let output = []
  for (let line of txt){

    let parsedLine: ResourcesLine = {
      indent: 0,
      type: "",
      html: html``  
    }

    let indent = line.match(/^(\s+)[a-zA-Z]/)
    if (indent){
      parsedLine.indent = indent[1].length/2
    }

    let objectPropertyMatch = line.match(/^\s+([a-z][a-zA-Z]+)\:\s(https*:\/\/.*$)/)
    let literalPropertyMatch = line.match(/^\s+([a-z][a-zA-Z]+)\:\s(?!http)(.*)$/)
    let blankNodePredicateMatch = line.match(/^\s+([a-z]+[a-zA-Z]+)$/)
    let blankNodeClassMatch = line.match(/^\s+([A-Z]+[a-zA-Z]+)$/)

    

    if (objectPropertyMatch){
      let objectProperty = objectPropertyMatch[1]
      let objectPropertyValueUri = objectPropertyMatch[2]   
      let objectPropertyValueUriDisplay = objectPropertyValueUri   
      this._dereference(objectProperty,'predicate')
      parsedLine.type = 'predicate'

      if (objectPropertyValueUri.indexOf("/vocabulary/") > -1){
        this._dereference(objectPropertyValueUri,'vocabulary')
        parsedLine.type = 'vocabulary'

        objectPropertyValueUriDisplay = objectPropertyValueUriDisplay.replace('http://id.loc.gov/vocabulary/','').replace('/',':')

      }else if (objectPropertyValueUri.indexOf("/ontologies/") > -1){
        
        this._dereference(objectPropertyValueUri,'ontologies')
        parsedLine.type = 'ontologies'

        objectPropertyValueUriDisplay = objectPropertyValueUriDisplay.replace('http://id.loc.gov/ontologies/bibframe/','bf:')
        objectPropertyValueUriDisplay = objectPropertyValueUriDisplay.replace('http://id.loc.gov/ontologies/bflc/','bflc:')
        

      }else if (objectPropertyValueUri.indexOf("/resources/") > -1){
        
        this._dereference(objectPropertyValueUri,'resources')
        objectPropertyValueUriDisplay = objectPropertyValueUriDisplay.replace('http://id.loc.gov/resources/works/','works:')
        objectPropertyValueUriDisplay = objectPropertyValueUriDisplay.replace('http://id.loc.gov/resources/instances/','instances:')
        objectPropertyValueUriDisplay = objectPropertyValueUriDisplay.replace('http://id.loc.gov/resources/instances','instances:instance')

        
        
        parsedLine.type = 'resources'
      }else if (objectPropertyValueUri.indexOf("/authorities/") > -1){
        
        this._dereference(objectPropertyValueUri,'authorities')
        parsedLine.type = 'authorities'

         objectPropertyValueUriDisplay = objectPropertyValueUriDisplay.replace('http://id.loc.gov/authorities/','').replace('/',':')
        
      }else if (objectPropertyValueUri.indexOf("/rwo/agents/") > -1){
        
        this._dereference(objectPropertyValueUri,'agents')
        parsedLine.type = 'agents'
        console.log("BEFORE",objectPropertyValueUriDisplay)
        objectPropertyValueUriDisplay = objectPropertyValueUriDisplay.replace('http://id.loc.gov/rwo/','').replace('/',':')
        console.log("after",objectPropertyValueUriDisplay)
      }




      parsedLine.html = html`<div class="statement space-mono-regular indent-${parsedLine.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-predicate-${objectProperty}`}" class="tool">${objectProperty}</a>: <a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-${parsedLine.type}-${objectPropertyValueUri}`}" class="tool object-value">${objectPropertyValueUriDisplay}</a> </div>`


      
    }else if (literalPropertyMatch){
      let literalProperty = literalPropertyMatch[1]
      let literalPropertyValue = literalPropertyMatch[2]
      this._dereference(literalProperty,'predicate')
      parsedLine.html = html`<div class="statement space-mono-regular indent-${parsedLine.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-predicate-${literalProperty}`}" class="tool">${literalProperty}</a>: ${literalPropertyValue}</div>`


    }else if (blankNodePredicateMatch){
      let blankNodePredicate = blankNodePredicateMatch[1]
      this._dereference(blankNodePredicate,'predicate')
      parsedLine.html = html`<div class="statement space-mono-regular indent-${parsedLine.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-predicate-${blankNodePredicate}`}" class="tool">${blankNodePredicate}</a></div>`
    }else if (blankNodeClassMatch){
      let blankNodeClass = blankNodeClassMatch[1]
      
      this._dereference(blankNodeClass,'class')
      parsedLine.html = html`<div class="statement space-mono-regular indent-${parsedLine.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-class-${blankNodeClass}`}" class="tool">${blankNodeClass}</a></div>`
    }else{

      console.log("NO MATCH",line)
    }


    
    output.push(parsedLine)
    
    

  }
  return output

}






  async firstUpdated() {
    

    let allPromises = []
    let instanceOrder = []
    let workOrder = []


    // build and resolve all the request for data in one async request at the same time
    for (let instaceId of this.instances.split(",")){
      let instanceReq = fetch(`${BASE_INSTANCE_URL}${instaceId}.txt`)
      instanceOrder.push(instaceId)
      allPromises.push(instanceReq)
    }
    for (let workId of this.works.split(",")){
      let workReq = fetch(`${BASE_WORK_URL}${workId}.txt`)
      allPromises.push(workReq)
      workOrder.push(workId)
    }

    let allPromisesResults
    try{
      allPromisesResults = await Promise.all(allPromises);
    }catch (error){
      console.error(error)
      alert("BF-Diagram:\nError retrieving records, see console.")
    }

    // extract all the text now that they are all resolved
    let allText = []
    if (allPromisesResults){
      for (let resolvedResults of allPromisesResults){
        let text = await resolvedResults.text()
        allText.push(text)
      }
    }

    // build the resource data obj now that we have everything
    for (let i of instanceOrder){

      for (let text of allText){
        let textAry = text.split("\n")
        if (textAry[0].indexOf(i) > -1 && textAry[0].indexOf('bf:Instance') >-1){

          let r: aResources = {id:i, type: 'dunno', parts: this._processTxt(textAry) }
          this.resources.instances.push(r)
          this.requestUpdate()

          

        }else if (textAry[0].indexOf(i) > -1 && textAry[0].indexOf('bf:Work') >-1){

          let r: aResources = {id:i, type: 'dunno', parts: this._processTxt(textAry) }
          this.resources.works.push(r)
          this.requestUpdate()



        }

      }
    }
    
    

    // window.setInterval(()=>{
    //   this.stateval = this.stateval + ':)'
    // },1000)

  }

  // _moreAbstractClick(e: Event) {
  //   this.showFullAbstract=true
  //   e.preventDefault()
  //   return false
  // }
  // _wikiThisDisplayClick(e: Event) {
  //   e.preventDefault()
  //   return false
  // }
  
  
  



  render() {

    // const itemTemplates = [];
    // if (this.properties){
    //   for (const i of this.properties.split(",")) {
    //     itemTemplates.push(html`<p>${i}</p>`);
    //   }
    // }

    let allInstances = []
    let allWorks = []

    for (let instance of this.resources.instances){

      let iHtml = []
      for (let line of instance.parts){
        iHtml.push(line.html)
      }
      allInstances.push(html`<div class="instance">${iHtml}</div>`)


    }
    for (let work of this.resources.works){

      let iHtml = []
      for (let line of work.parts){
        iHtml.push(line.html)
      }
      allWorks.push(html`<div class="work">
          <svg id="work-0-svg" class="work-svg" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
          </svg>
        ${iHtml}
      </div>`)


    }
    

    let layout = html`
    
      <div id="bf-diagram-container">
        <div>
          ${allWorks}
      
        </div>
        <div class="instance-icons">
          <span class="tool" data-tip="By adding this class you can provide almost any element with a tool tip." tabindex="1">tool</span> 
      
          <svg id="instance-0-svg" class="hidden-by-default instance-svg" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
          </svg>
          <svg id="instance-1-svg" class="hidden-by-default instance-svg" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
          </svg>
          <svg id="instance-2-svg" class="hidden-by-default instance-svg" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
          </svg>
          <svg id="instance-3-svg" class="hidden-by-default instance-svg" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
          </svg>      

        </div>
        <div class="col-instnace">
          ${allInstances}   
        </div>



      </div>
    
    `

    return html`
      ${layout}






    `
  }


  static styles = css`

    <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap')
    </style>

    :host {

        
      
    }
    .hidden-by-default{
      display:none;
    }
    .space-mono-regular {
      font-family: "Space Mono", monospace;
      font-weight: 400;
      font-style: normal;
    }
    
    .instance{
      margin-bottom:4em;
    }
    .instance:first-of-type {
      margin-top:10em;

    }
    .instance-svg{
      width:25%;
      position:relative;
      margin-left:auto;
      
    }
    .work-svg{
      width:25%;
      display:block;
      margin-left:auto;
      margin-right:auto;

    }
    .instance-icons{
      position:relative;

    }

    #bf-diagram-container{
      overflow-x:hidden;
      position:relative;
      display: grid; 
      grid-template-columns: 1fr 1fr 1fr; 
      grid-template-rows: 1fr; 
      gap: 0px 0px; 
      grid-template-areas: 
        ". . ."; 
      // background-color:red;
    }

    .col-instnace{
      // background-color:lightblue;
    }
    .statement{
      margin-top:3px;
      margin-bottom:3px;      
    }
    .statement a{
      color:black !important;
      text-decoration: none;

    }
    .statement a:hover{
      color:black !important;
      text-decoration: underline !important;
    }
    .statement a::visited{
      color:black !important;
      text-decoration: none;
    }

    .indent-2{
      padding-left:2em;
    }
    .indent-4{
      padding-left:4em;
    }
    .indent-6{
      padding-left:6em;
    }
    .indent-8{
      padding-left:8em;
    }
    .indent-10{
      padding-left:10em;
    }
    .indent-12{
      padding-left:12em;
    }    
    .indent-14{
      padding-left:14em;
    }    

    .object-value{}


    /*== start of code for tooltips ==*/
    .tool {
        cursor: help;
        position: relative;
    }
    
    
    /*== common styles for both parts of tool tip ==*/
    .tool::before,
    .tool::after {
        left: 50%;
        opacity: 0;
        position: absolute;
        z-index: -100;
    }
    
    .tool:hover::before,
    .tool:focus::before,
    .tool:hover::after,
    .tool:focus::after {
        opacity: 1;
        transform: scale(1) translateY(0);
        z-index: 100; 
    }
    
    
    /*== pointer tip ==*/
    .tool::before {
        border-style: solid;
        border-width: 1em 0.75em 0 0.75em;
        border-color: #3E474F transparent transparent transparent;
        bottom: 100%;
        content: "";
        margin-left: 0.5em;
        transition: all .2s cubic-bezier(.84,-0.18,.31,1.26), opacity .65s .5s;
        transform:  scale(.6) translateY(-90%);
    } 
    
    .tool:hover::before,
    .tool:focus::before {
        transition: all .2s cubic-bezier(.84,-0.18,.31,1.26) .2s;
    }
    
    
    /*== speech bubble ==*/
    .tool::after {
        background: #3E474F;
        border-radius: .25em;
        bottom: 180%;
        color: #EDEFF0;
        content: attr(data-tip);
        margin-left: -8.75em;
        padding: 1em;
        transition: all .2s cubic-bezier(.84,-0.18,.31,1.26) .2s;
        transform:  scale(.6) translateY(50%);  
        width: 17.5em;
    }
    
    .tool:hover::after,
    .tool:focus::after  {
        transition: all .2s cubic-bezier(.84,-0.18,.31,1.26);
    }
    
    @media (max-width: 760px) {
      .tool::after { 
            font-size: .75em;
            margin-left: -5em;
            width: 10em; 
      }
    }


  `
}

declare global {
  interface HTMLElementTagNameMap {
    'bf-diagram': BfDiagram
  }
}
