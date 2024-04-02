# bf-diagram-webcomponent
A BF diagram web component


Demo: https://lcnetdev.github.io/bf-diagram-webcomponent/

## To use

Include the [Javascript file](https://github.com/lcnetdev/bf-diagram-webcomponent/blob/main/dist/assets/bf-diagram.js) in your page:
```
<script type="module" src="bf-diagram.js">
```

Add the web component custom element:
```
 <bf-diagram instances="22181412,22183166" works="22181412" fixinstanceof/>
```

See the demo page for the  parameters you can set.


## To develop

```
git clone https://github.com/lcnetdev/bf-diagram-webcomponent.git
cd bf-diagram-webcomponent
npm install
npm run dev
```

The file `bf-diagram.ts` contains all the code and CSS.


To build: 
```
npm run build
```
The files will be 
