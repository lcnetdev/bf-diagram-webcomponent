import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'


const BASE_INSTANCE_URL = "https://id.loc.gov/resources/instances/"
const BASE_WORK_URL = "https://id.loc.gov/resources/works/"
const BASE_HUB_URL = "https://id.loc.gov/resources/hubs/"

const IGNORE_COMMON_PREDICATES = ['type','date','value','qualifier','label']


// interface textLayout {
//   indent: number,
//   text: string
// }
interface aResources {
  id: string,
  parts: ResourcesLine[],
  type: string,
  parents:string[],
  children:string[]  
}

interface Resources {
  instances: aResources[],
  works: aResources[],
  hubs: aResources[]
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
  @property({ type: String }) hubs = ""
  @property({ type: String }) ignore = ""

  @property({ type: Boolean }) fixinstanceof = false


  @state() stateval: string = ""

  @state() resources: Resources = {instances:[],works:[],hubs:[]}

  @state() finalDereferenceTimeout: null| number = null
  @state() processTxtCurrentParentPredicate: string = ''

  

  constructor() {
    super();
  
    // we are setting the default values, will get overwritten by the attribute properties if provided
    // this.instances = "22181412,22183166"
    // this.works = "22181412"
    // this.hubs = 'b2581ff4-e0fe-9279-3762-96f404ceb5dd'
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
                runningTop: runningTop,
                parents: this.resources.instances[i].parents,
                iconTop:''               
              })

              runningTop = runningTop + parseFloat(iStyle.height)
            }

            for (let i of instancesData){

              let svg = this.shadowRoot.querySelector<HTMLElement>(`#instance-${i.id}-svg`)
              if (svg){
                svg.style.display='block'
                svg.style.top = i.runningTop + (i.middle / 2) + 'px'
              }
              i.iconTop = i.runningTop + (i.middle / 2) + 'px'
            }

            let firstWork = this.shadowRoot.querySelector<HTMLElement>(`.work:first-of-type `)

            if(firstWork){
              firstWork.style.marginTop = container.clientHeight / 4 + 'px'
              
            }

            let topInstanceX = ''
            let bottomInstanceX = ''
            // now draw the lines
            for (let [idx, i] of instancesData.entries()){

              let instanceBelowWork = false
              let work = this.shadowRoot.querySelector<HTMLElement>(`[data-resource="work-${i.parents[0]}-icon"]`)
              
              if (work && work.parentElement && work.parentElement.offsetTop && parseFloat(i.iconTop) >= work.parentElement.offsetTop){
                instanceBelowWork = true

              }
              
              let instanceLineContainer = this.shadowRoot.querySelector<HTMLElement>(`#instance-line-${i.id}-svg`)
              if (instanceLineContainer){
                // hide lines if no parent
                if (this.resources.works.map((ww)=>{ return ww.id}).indexOf(i.parents[0]) == -1){
                  instanceLineContainer.style.display='none';
                }
              }

              let instanceIcon = this.shadowRoot.querySelector<HTMLElement>(`#instance-${i.id}-svg`)
              

              if (i.parents[0] && instanceLineContainer){
                
                // let parent = this.shadowRoot.querySelector<HTMLElement>(`[data-resource="work-${i.parents[0]}-icon"]`)
                

                
                
                
                let instanceHolderWidth = this.shadowRoot.querySelector(".instance-icons")

                if (instanceBelowWork){

                  instanceLineContainer.style.top = work?.parentElement?.offsetTop + 'px'


                  



                  if (work && work.parentElement && instanceIcon && instanceHolderWidth){



                    instanceLineContainer.style.height = parseFloat(i.iconTop) - work.parentElement.offsetTop + instanceIcon?.clientHeight + 'px'
                    // instanceLineContainer.style.opacity = '0.25'
                    instanceLineContainer.style.width = instanceHolderWidth.clientWidth + (work.parentElement.offsetWidth / 2) +'px'
                    instanceLineContainer.style.left = work.parentElement.offsetWidth - (work.parentElement.offsetWidth / 2) + 'px'

                    // console.log("work.parentElement.offsetWidth",work.parentElement.offsetWidth)
                    if (bottomInstanceX === ''){
                      bottomInstanceX = parseFloat(instanceLineContainer.style.width) - instanceIcon.clientWidth - (Math.floor(Math.random() * (250 - 100 + 1)) + 100)   + ''
                    }

                    let line1 = instanceLineContainer.querySelector('.line-part-1')
                    if (line1){
                      line1.setAttribute('y1', instanceLineContainer.clientHeight - (instanceIcon.clientHeight /2) +'')
                      line1.setAttribute('y2', instanceLineContainer.clientHeight - (instanceIcon.clientHeight /2) +'')
                      line1.setAttribute('x1', parseFloat(instanceLineContainer.style.width) - instanceIcon.clientWidth + '') 
                      line1.setAttribute('x2', bottomInstanceX) 
                    }
                    let line2 = instanceLineContainer.querySelector('.line-part-2')
                    if (line2 && line1){                      
                      line2.setAttribute('y1', instanceIcon.clientHeight / 2 - 3 +'')
                      line2.setAttribute('y2', (instanceIcon.clientHeight / 2) + parseFloat(instanceLineContainer.style.height) - instanceIcon.clientHeight + 4 + '')
                      line2.setAttribute('x1',  line1.getAttribute('x2') + '' ) 
                      line2.setAttribute('x2', line1.getAttribute('x2') + '' ) 
                    }
                    let line3 = instanceLineContainer.querySelector<HTMLElement>('.line-part-3')
                    if (line3){
                      line3.style.display = 'none'
                    }

                    
                  }


                }else{
                  // its above the work icon
                  instanceLineContainer.style.top = i.iconTop



                  if (work && work.parentElement && instanceIcon && instanceHolderWidth){
                    instanceLineContainer.style.height = (work.parentElement.offsetTop - parseFloat(i.iconTop) + instanceIcon?.clientHeight) +'px'
                    // instanceLineContainer.style.opacity = '0.25'
                    instanceLineContainer.style.width = instanceHolderWidth.clientWidth + (work.parentElement.offsetWidth / 2) +'px'
                    instanceLineContainer.style.left = work.parentElement.offsetWidth - (work.parentElement.offsetWidth / 2) + 'px'

                    
                      
                    if (topInstanceX === ''){
                      topInstanceX = parseFloat(instanceLineContainer.style.width) - instanceIcon.clientWidth - (Math.floor(Math.random() * (100 - 50 + 1)) + 50)   + ''
                    }

                    let line1 = instanceLineContainer.querySelector('.line-part-1')
                    if (line1){
                      line1.setAttribute('y1', instanceIcon.clientHeight / 2 +'')
                      line1.setAttribute('y2', instanceIcon.clientHeight / 2 +'')
                      line1.setAttribute('x1', parseFloat(instanceLineContainer.style.width) - instanceIcon.clientWidth + '') 
                      line1.setAttribute('x2', topInstanceX) 
                    }
                    let line2 = instanceLineContainer.querySelector('.line-part-2')
                    if (line2 && line1){
 
                      
                      line2.setAttribute('y1', instanceIcon.clientHeight / 2 - 3 +'')
                      line2.setAttribute('y2', (instanceIcon.clientHeight / 2) + parseFloat(instanceLineContainer.style.height) - instanceIcon.clientHeight + 4 + '')
                      line2.setAttribute('x1',  line1.getAttribute('x2') + '' ) 
                      line2.setAttribute('x2', line1.getAttribute('x2') + '' ) 
                    }
                   
                    
                    let line3 = instanceLineContainer.querySelector<HTMLElement>('.line-part-3')
                    if (line3 && line2 ){

                      line3.setAttribute('y1', (instanceIcon.clientHeight / 2) + parseFloat(instanceLineContainer.style.height) - instanceIcon.clientHeight + '')
                      line3.setAttribute('y2', (instanceIcon.clientHeight / 2) + parseFloat(instanceLineContainer.style.height) - instanceIcon.clientHeight + '')
                      line3.setAttribute('x1', line2.getAttribute('x2') + '' ) 
                      line3.setAttribute('x2', 0 + (instanceIcon.clientWidth/2 + 20)  + '' ) 

                    }

                    if (idx == 0){
                      // add the label for the first one
                      let text = instanceLineContainer.querySelector<HTMLElement>('.bf-instance-of')
                      if (text && line3){
                        text.style.display="block"
                        text.setAttribute('x', instanceLineContainer.clientWidth / 2  - 100 + '' )
                        text.setAttribute('y', (instanceIcon.clientHeight / 2) + parseFloat(instanceLineContainer.style.height) - 10 - instanceIcon.clientHeight + '')

                        
                      }
                      

                    }



                  }

                }


               
                
              }


              //instnace-${instance.id}-icon


            }




            
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
  
  id = id.replace("http://","https://")

  if (this.finalDereferenceTimeout !== null){
    window.clearTimeout(this.finalDereferenceTimeout)
  }
  this.finalDereferenceTimeout = window.setTimeout(()=>{
    
    this.requestUpdate()
  },1000)
  
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
      console.error(error)
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


    
    fetch(id + '.skos.rdf', {
      method: "GET"
    })
    .then( async (idResponse) => {
      if (idResponse.status === 200){
        let xml = await idResponse.text()
        let url = id
        let labelDesc = this._extractLabelDescriptionFromXmlRDF(xml, url)
        // labelDesc.desc = labelDesc.desc + " (vocab. resource)"

        
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
    if (parsedLine.indent < 2){ this.processTxtCurrentParentPredicate = ''}


    
    let objectPropertyMatch = line.match(/^\s+([a-z][a-zA-Z]+)\:\s(https*:\/\/.*$)/)
    let literalPropertyMatch = line.match(/^\s+([a-z][a-zA-Z0-9\-]+)\:\s(?!http)(.*)$/)
    let blankNodePredicateMatch = line.match(/^\s+([a-z]+[a-zA-Z]+)$/)
    let blankNodeClassMatch = line.match(/^\s+([A-Z]+[a-zA-Z]+)$/)



    if (objectPropertyMatch){
      let objectProperty = objectPropertyMatch[1]
      let objectPropertyValueUri = objectPropertyMatch[2]   
      let objectPropertyValueUriDisplay = objectPropertyValueUri   
      if (parsedLine.indent==2){this.processTxtCurrentParentPredicate = objectProperty}
      if (this.ignore.split(",").indexOf(this.processTxtCurrentParentPredicate) >-1){
        continue
      }
      
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
        
        objectPropertyValueUriDisplay = objectPropertyValueUriDisplay.replace('http://id.loc.gov/rwo/','').replace('/',':')
        
      }




      parsedLine.html = html`<div class="statement space-mono-regular indent-${parsedLine.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-predicate-${objectProperty}`}" class="tool">${objectProperty}</a>: <a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-${parsedLine.type}-${objectPropertyValueUri}`}" class="tool object-value">${objectPropertyValueUriDisplay}</a> </div>`


      
    }else if (literalPropertyMatch){
      let literalProperty = literalPropertyMatch[1]
      let literalPropertyValue = literalPropertyMatch[2]
      if (parsedLine.indent==2){this.processTxtCurrentParentPredicate = literalProperty}

      if (this.ignore.split(",").indexOf(this.processTxtCurrentParentPredicate) >-1){
        continue
      }
      

      this._dereference(literalProperty,'predicate')
      parsedLine.html = html`<div class="statement space-mono-regular indent-${parsedLine.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-predicate-${literalProperty}`}" class="tool">${literalProperty}</a>: ${literalPropertyValue}</div>`


    }else if (blankNodePredicateMatch){
      let blankNodePredicate = blankNodePredicateMatch[1]
      if (parsedLine.indent==2){this.processTxtCurrentParentPredicate = blankNodePredicate}

      if (this.ignore.split(",").indexOf(this.processTxtCurrentParentPredicate) >-1){
        continue
      }   
      
      this._dereference(blankNodePredicate,'predicate')
      parsedLine.html = html`<div class="statement space-mono-regular indent-${parsedLine.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-predicate-${blankNodePredicate}`}" class="tool">${blankNodePredicate}</a></div>`
    }else if (blankNodeClassMatch){
      let blankNodeClass = blankNodeClassMatch[1]
      if (this.ignore.split(",").indexOf(this.processTxtCurrentParentPredicate) >-1){
        continue
      }

      this._dereference(blankNodeClass,'class')
      parsedLine.html = html`<div class="statement space-mono-regular indent-${parsedLine.indent}"><a @mouseover="${this._mouseOverToolTip}" target="_blank" data-derefid="${`bf-diagram-class-${blankNodeClass}`}" class="tool">${blankNodeClass}</a></div>`
    }else if (line.indexOf(' (bf:Instance)') > -1 || line.indexOf(' (bf:Work)') > -1 || line.indexOf(' (bf:Hub)') > -1){
      // http://id.loc.gov/resources/instances/22181412 (bf:Instance)
      // we arleady know what the resource is
    }else{

      

      
    }

    if (line.trim() == ''){ continue }
    

    
    output.push(parsedLine)
    
    

  }
  return output

}

_buildRelantionships(data: aResources, textAry: string[]){


  let parents: string[] = []
  let children: string[] = []

  for (let line of textAry){

    if (data.type === 'instance'){
      if (line.indexOf('instanceOf:') > -1){
        let workId = line.split("/").pop()
        // if we are collapsing all instances to point to the first work
        if (this.fixinstanceof){
          if (this.resources.works.length>0){
            parents.push(this.resources.works[0].id)
          }
        }else{
          if (workId){
            parents.push(workId)
          }
        }
      }
    }else if (data.type === 'work'){
      if (line.indexOf('hasInstance:') > -1){
        let instanceId = line.split("/").pop()
        // if we are collapsing all instances to point to the first work
        if (instanceId){
          children.push(instanceId)
        }
      }
    }


  }



  return {
    children:children,
    parents:parents
  }
    

}




  async firstUpdated() {
    

    let allPromises = []
    let instanceOrder = []
    let workOrder = []
    let hubOrder = []


    // build and resolve all the request for data in one async request at the same time
    for (let instaceId of this.instances.split(",")){
      if (instaceId.trim().length==0){ continue }

      let instanceReq = fetch(`${BASE_INSTANCE_URL}${instaceId}.composed.txt`)
      instanceOrder.push(instaceId)
      allPromises.push(instanceReq)
    }
    for (let workId of this.works.split(",")){
      if (workId.trim().length==0){ continue }

      let workReq = fetch(`${BASE_WORK_URL}${workId}.composed.txt`)
      allPromises.push(workReq)
      workOrder.push(workId)
    }
    for (let hubId of this.hubs.split(",")){
      if (hubId.trim().length==0){ continue }
      let hubReq = fetch(`${BASE_HUB_URL}${hubId}.composed.txt`)
      allPromises.push(hubReq)
      hubOrder.push(hubId)
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
    for (let w of workOrder){
      for (let text of allText){
        let textAry = text.split("\n")
        if (textAry[0].indexOf(w) > -1 && textAry[0].indexOf('bf:Work') >-1){
            let r: aResources = {id:w, type: 'work', parts: this._processTxt(textAry), parents: [],children:[] }       
            r.children = this._buildRelantionships(r, textAry).children

            this.resources.works.push(r)
            this.requestUpdate()
            break
          }
      }
    }

    for (let i of instanceOrder){
      for (let text of allText){
        let textAry = text.split("\n")
        if (textAry[0].indexOf(i) > -1 && textAry[0].indexOf('bf:Instance') >-1){          
          let r: aResources = {id:i, type: 'instance',  parts: this._processTxt(textAry), parents: [],children:[] }    
          r.parents = this._buildRelantionships(r, textAry).parents
          this.resources.instances.push(r)
          this.requestUpdate()
          break
        }
      }
    }

    for (let i of hubOrder){
      for (let text of allText){
        let textAry = text.split("\n")
        if (textAry[0].indexOf(i) > -1 && textAry[0].indexOf('id.loc.gov/resources/hubs/') >-1){          
          let r: aResources = {id:i, type: 'hub',  parts: this._processTxt(textAry), parents: [],children:[] }    

          this.resources.hubs.push(r)
          this.requestUpdate()
          break
        }
      }
    }



    

    // else 

    

    // window.setInterval(()=>{
    //   this.stateval = this.stateval + ':)'
    // },1000)

  }

  // _moreAbstractClick(e: Event) {
  //   this.showFullAbstract=true
  //   e.preventDefault()
  //   return false
  // }
  // _instanceIconClick(e: Event) {
    
    
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
    let allHubs = []

    let allInstancesIcons = []
    let allInstancesLines = []

    let counter = 0

  
    
    for (let instance of this.resources.instances){
      

      let iHtml = []
      for (let line of instance.parts){
        iHtml.push(line.html)
      }
      allInstances.push(html`<div class="instance">
          


        ${iHtml}
      
      
      </div>`)


      allInstancesLines.push(html`

          <svg id="instance-line-${counter}-svg" class="instance-line-svg"  >
            
            <rect width="100%" height="100%" />
            <defs>
              <!-- <marker id="arrow-${counter}" markerWidth="4" fill="red" markerHeight="8" refX="4.7" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L9,3 z" />
              </marker> -->
              <marker
                id="arrow-${counter}"
                fill="#565656"
                viewBox="0 0 15 15"
                refX="5"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" />
              </marker>

            </defs>
            <line class="line-part-1" x1="150" y1="150" x2="250" y2="150" stroke="#565656" stroke-width="8"  />
            <line class="line-part-2" x1="150" y1="150" x2="250" y2="150" stroke="#565656" stroke-width="8"  />

            <line class="line-part-3" x1="0" y1="0" x2="250" y2="50" stroke="#565656" stroke-width="8" marker-end="url(#arrow-${counter})" />
            <text class="bf-instance-of" x="0" y="0" >bf:instanceOf</text>
            <!-- <line x1="50" y1="100" x2="250" y2="100" stroke="#000" stroke-width="5"/> -->
          </svg>

      
      `)


      allInstancesIcons.push(html`

      <svg @click=${() => {window.open('https://id.loc.gov/resources/instances/' + instance.id, "_blank",)}}  id="instance-${counter}-svg" data-resource="instnace-${instance.id}-icon" class="hidden-by-default instance-svg" version="1.1" viewbox="0 0 105 105" xmlns="http://www.w3.org/2000/svg">
          <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
          <text x="0%" y="98%">instances/${instance.id}</text>
        </svg>    

        
      `)




      counter++

    }
    for (let work of this.resources.works){

      let iHtml = []
      for (let line of work.parts){
        iHtml.push(line.html)
      }
      allWorks.push(html`<div class="work">
          <svg @click=${() => {window.open('https://id.loc.gov/resources/works/' + work.id, "_blank",)}} id="work-0-svg" data-resource="work-${work.id}-icon" class="work-svg" version="1.1" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg">
            <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
            <text x="10%" y="98%">works/${work.id}</text>
          </svg>
        ${iHtml}
      </div>`)
    }

    let hubArrorw = html``

    if (this.resources.hubs.length>0){
      hubArrorw = html`
          <svg class="hub-arrow-svg" width="100%" height="100px" version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <marker
                id="arrow-hub"
                fill="#565656"
                viewBox="0 0 15 15"
                refX="5"
                refY="5"
                markerWidth="3"
                markerHeight="3"
                orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" />
              </marker>  
        
          <line x1="50%" x2="50%" y1="20" y2="90" stroke="#565656" stroke-width="8" marker-end="url(#arrow-hub)" />
          <text x="60%" y="60%">bf:expressionOf</text>
          </svg>

    `


    }

    for (let hub of this.resources.hubs){

      let iHtml = []
      for (let line of hub.parts){
        iHtml.push(line.html)
      }
      allHubs.push(html`<div class="hub">
          <svg @click=${() => {window.open('https://id.loc.gov/resources/hubs/' + hub.id, "_blank",)}} data-resource="hub-${hub.id}-icon" class="hub-svg" version="1.1" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg">
           
        
          
            <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
            <text x="10%" y="98%">hubs/${hub.id.split("-")[0]+'...'}</text>
          </svg>
        ${iHtml}
      </div>`)


      
    }




    // allHubs.push(html`<div class="work">
    // <svg @click=${() => {window.open('https://id.loc.gov/resources/hubs/' + work.id, "_blank",)}} id="work-0-svg" data-resource="work-${work.id}-icon" class="work-svg" version="1.1" viewBox="0 0 105 105" xmlns="http://www.w3.org/2000/svg">
    //   <path d="m74.453 8.6523-0.28906-0.5h-48.324l-24.16 41.848 24.16 41.848h48.324l24.156-41.848z"/>
    //   <text x="10%" y="98%">works/${work.id}</text>
    // </svg>
    // ${iHtml}
    // </div>`)
    

    let layout = html`
    
      <div id="bf-diagram-container">
        <div>
          ${allWorks}
          ${hubArrorw}
          ${allHubs}
        </div>
        <div class="instance-icons">
        
          ${allInstancesIcons}
          
        </div>
        <div class="col-instnace">
          ${allInstances}   
        </div>

        ${allInstancesLines}
        
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
      color: #565656;

      font-style: normal;
    }
    
    .instance{
      margin-bottom:4em;
    }
    .instance:first-of-type {
      margin-top:10em;

    }
    .instance-svg{
      cursor:pointer;
      width:112px;
      position:absolute;
      right:0;
      margin-left:auto;
      fill:#565656;
      
    }
    .instance-svg:hover{
      fill:black;
    }
    .instance-svg text{
      font-size:0.6em;
      font-family: "Space Mono", monospace;

    }

    .work-svg{
      width:112px;
      display:block;
      margin-left:auto;
      margin-right:auto;
      cursor:pointer;
      fill:#565656;

    }

    .work-svg path:hover{
      fill:black;
    }
    .work-svg text{
      font-size:0.6em;
      font-family: "Space Mono", monospace;
      fill:#565656;

    }
    .hub-svg{
      width:112px;
      display:block;
      margin-left:auto;
      margin-right:auto;
      cursor:pointer;
      fill:#565656;

    }

    .hub-svg path:hover{
      fill:black;
    }
    .hub-svg text{
      font-size:0.6em;
      font-family: "Space Mono", monospace;
      fill:#565656;

    }

    .hub-arrow-svg text{
      font-size:1em;
      font-family: "Space Mono", monospace;
      fill:#565656;

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
      color: #565656  !important;
      text-decoration: none;

    }
    .statement a:hover{
      color:black !important;
      color: #565656  !important;
      text-decoration: underline !important;
    }
    .statement a::visited{
      color:black !important;
      color: #565656  !important;
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


    .instance-line-svg{
      position: absolute;
      left:0;
      top:0;
      height:100px;
      width:100px;
      fill: transparent;
      z-index:-100;

    }

    .bf-instance-of{
      display:none;
      font-family: "Space Mono", monospace;
      fill: #565656;
    }


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
        // border-color: #efefef transparent transparent transparent;
        border-color: #efefef transparent transparent transparent;
        bottom: 100%;
        content: "";
        margin-left: 1.9em;
        transition: all .2s cubic-bezier(.84,-0.18,.31,1.26), opacity .65s .5s;
        transform:  scale(.6) translateY(-90%);
    } 
    
    .tool:hover::before,
    .tool:focus::before {
        transition: all .2s cubic-bezier(.84,-0.18,.31,1.26) .2s;
    }
    
    
    /*== speech bubble ==*/
    .tool::after {
        background: #efefef;
        border-radius: .25em;
        border: solid 1px #ddd;
        bottom: 180%;
        color: #333;
        content: attr(data-tip);
        margin-left: 1.75em;
        padding: 1em;
        transition: all .2s cubic-bezier(.84,-0.18,.31,1.26) .2s;
        transform:  scale(.6) translateY(50%);  
        width: 17.5em;
    }
    .instance .tool::after {
      margin-left: -15.75em;
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
