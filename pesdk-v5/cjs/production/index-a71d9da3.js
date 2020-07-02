"use strict";var e=require("./no-polyfills-c5803b5e.js");require("styled-components"),require("react"),require("react-dom"),require("react-dom/server");var i="5.3.1",t=function(){function t(i,t,r,o,a,n){var s=this;this.mapImagePointToRelativeCropPoint=function(i){var t=e.pointFromSpaceToSpace(i,s.imageSpace,s.cropSpace,!1);return e.absoluteToRelativePoint(t,s.cropSpace,!1)},this.mapSizeToRelativeUnscaledCropSize=function(e){return e/Math.min(s.outputSize.height,s.outputSize.width)},this.mapSizeToRelativeScaledCropSize=function(e){return e/Math.min(s.outputSize.height*s.outputScale.x,s.outputSize.width*s.outputScale.y)},this.getPointInDirection=function(e,i,t){void 0===i&&(i=0),void 0===t&&(t=3);var r=Math.tan(i),o=Math.sqrt(Math.pow(r,2)+1);return{x:e.x+t/o,y:e.y+t*r/o}},this.previewPosition=i,this.previewSize=t,this.outputSize=r,this.imageSize=o,this.imageSpace=a,this.cropSpace=n,this.outputScale=n.getScale()}return t.serializeFilters=function(e){return{type:"filter",options:{intensity:e.intensity,identifier:e.identifier}}},t.serializeAdjustments=function(e){return{type:"adjustments",options:e}},t.serializeOverlay=function(e){return{type:"overlay",options:{identifier:e.identifier,intensity:e.opacity,blendMode:e.blendMode.replace(/[A-Z]/g,(function(e){return" "+e.toLowerCase()}))}}},t.serializeMetaData=function(){return{platform:"html5",version:i,createdAt:(new Date).toISOString()}},t.prototype.serialise=function(i,r,o){var a=this,n=t.serializeMetaData(),s={width:this.imageSize.width,height:this.imageSize.height};r&&(s.type=o,s.data=r);var p=[],l=[],d=i.adjustment;Object.keys(d).map((function(e){return d[e]})).filter(Boolean).length&&p.push(t.serializeAdjustments(d));var u=i.filter;"identity"!==u.identifier&&p.push(t.serializeFilters(u));var c=i.overlay;if("identity"!==c.identifier&&l.push(t.serializeOverlay(c)),i.transform){var m=this.serializeTransform(i.transform),h=m.transform,f=m.orientation,z=[0!==h.options.start.x,0!==h.options.start.y,1!==h.options.end.x,1!==h.options.end.y,0!==h.options.rotation],S=[0!==f.options.rotation,!1!==f.options.flipVertically,!1!==f.options.flipHorizontally];z.some((function(e){return e}))&&p.push(h),S.some((function(e){return e}))&&p.push(f)}var g=i.frame;"identity"!==g.identifier&&l.push(this.serialzeFrame(g));var y=i.focus;if("identity"!==y.identifier&&p.push(this.serializeFocus(y)),i.sprite&&i.sprite.spriteIdList.forEach((function(e){var t=i.sprite.common[e];switch(t.tool){case"sticker":var r=i.sprite.sticker[e];l.push(a.serializeSticker(r,t,i.transform));break;case"text":var o=i.sprite.text[e];l.push(a.serializeText(o,t));break;case"textdesign":var n=i.sprite.textdesign[e];l.push(a.serializeTextDesign(n,t))}})),i.brush.strokes.length&&l.push({type:"brush",options:{paths:i.brush.strokes.map((function(e){return{points:e.path.controlPoints.map(a.mapImagePointToRelativeCropPoint),brush:{color:{rgba:e.brush.color},size:a.mapSizeToRelativeUnscaledCropSize(e.brush.size),hardness:e.brush.hardness}}}))}}),l.length){var v={type:"sprite",options:{sprites:l}};p.push(v)}var T={assets:{stickers:i.customStickers?i.customStickers.map((function(i){return e.__assign(e.__assign({},i),{raster:e.__assign(e.__assign({},i.raster),{data:i.raster.data.replace((t=i.raster.type,void 0===t&&(t=e.ImageFormat.PNG),"data:"+t+";base64,"),"")})});var t})):[]}};return{version:t.version,meta:n,image:s,operations:p,assetLibrary:T}},t.prototype.serialzeFrame=function(e){return{type:"frame",options:{identifier:e.identifier,alpha:e.opacity,tintColor:{rgba:e.color},size:this.mapSizeToRelativeUnscaledCropSize(e.width)}}},t.prototype.serializeFocus=function(i){var t=Math.sqrt(Math.pow(this.previewSize.width,2)+Math.pow(this.previewSize.height,2));switch(i.identifier){case e.FocusIdentifier.LINEAR:return{type:"focus",options:{type:"linear",options:{start:this.mapImagePointToRelativeCropPoint(i.linear.start),end:this.mapImagePointToRelativeCropPoint(i.linear.end),blurRadius:this.mapSizeToRelativeScaledCropSize(i.linear.blurRadius)}}};case e.FocusIdentifier.RADIAL:return{type:"focus",options:{type:"radial",options:{start:this.mapImagePointToRelativeCropPoint(i.radial.center),end:this.mapImagePointToRelativeCropPoint(this.getPointInDirection(i.radial.center,0,i.radial.radius)),blurRadius:this.mapSizeToRelativeScaledCropSize(i.radial.blurRadius),gradientRadius:.1}}};case e.FocusIdentifier.MIRRORED:var r=i.mirrored;return{type:"focus",options:{type:"mirrored",options:{start:this.mapImagePointToRelativeCropPoint(this.getPointInDirection(r.origin,r.rotation,t/2)),end:this.mapImagePointToRelativeCropPoint(this.getPointInDirection(r.origin,r.rotation,-t/2)),size:this.mapSizeToRelativeScaledCropSize(i.mirrored.size),blurRadius:this.mapSizeToRelativeScaledCropSize(i.mirrored.blurRadius),gradientSize:.1}}};default:return{type:"focus",options:{type:"gaussian",options:{blurRadius:this.mapSizeToRelativeScaledCropSize(i.gaussian.blurRadius)}}}}},t.prototype.serializeSticker=function(e,i,t){return{type:"sticker",options:{position:this.mapImagePointToRelativeCropPoint(i.position),dimensions:{x:this.mapSizeToRelativeScaledCropSize(i.size.width),y:this.mapSizeToRelativeScaledCropSize(i.size.height)},rotation:i.rotation,flipVertically:(i.flipVertically||!1)!==(t.flipVertically||!1),flipHorizontally:(i.flipHorizontally||!1)!==(t.flipHorizontally||!1),identifier:e.identifier,alpha:e.opacity,tintColor:{rgba:e.tintColor},tintMode:e.tintMode}}},t.prototype.serializeText=function(e,i){return{type:"text",options:{position:this.mapImagePointToRelativeCropPoint(i.position),rotation:i.rotation,flipVertically:!1,flipHorizontally:!1,fontIdentifier:e.identifier,fontSize:this.mapSizeToRelativeScaledCropSize(e.fontSize),maxWidth:this.mapSizeToRelativeScaledCropSize(e.width),text:e.text,lineHeight:e.lineHeight,color:{rgba:e.textColor},backgroundColor:{rgba:e.backgroundColor},alignment:e.alignment}}},t.prototype.serializeTextDesign=function(e,i){return{type:"textdesign",options:{position:this.mapImagePointToRelativeCropPoint(i.position),rotation:i.rotation,flipVertically:!1,flipHorizontally:!1,identifier:e.identifier,inverted:e.isInverted,text:e.text,seed:e.seed,width:this.mapSizeToRelativeScaledCropSize(e.width),padding:this.mapSizeToRelativeScaledCropSize(e.padding),color:{rgba:e.color}}}},t.prototype.serializeTransform=function(e){return{transform:{type:"transform",options:{start:e.start,end:e.end,rotation:e.rotation,meta:{identifier:e.identifier}}},orientation:{type:"orientation",options:{rotation:e.outputRotation,flipHorizontally:e.flipHorizontally,flipVertically:e.flipVertically}}}},t.version="3.9.0",t}(),r=function(i){return void 0===i&&(i=e.ImageFormat.PNG),"data:"+i+";base64,"},o=function(){function i(i){var t=this;this.spriteOrder=0,this.mapRelativeCropPointToImageSpace=function(i){var r=e.relativeToAbsolutePoint(i,t.cropSpace,!1);return e.pointFromSpaceToSpace(r,t.cropSpace,t.imageSpace,!1)},this.mapRelativeCropSizeToScaledImageSize=function(e){return e*Math.min(t.outputSize.height*t.outputScale.x,t.outputSize.width*t.outputScale.y)},this.mapRelativeCropSizeToUnscaledImageSize=function(e){return e*Math.min(t.outputSize.height,t.outputSize.width)},this.editor=i}return i.deserializeFilter=function(e){return{intensity:e.intensity,identifier:e.identifier}},i.deserializeAdjustments=function(i){return e.__assign({},i)},i.deserializeOverlay=function(e){return{identifier:e.identifier,opacity:e.intensity,blendMode:e.blendMode.replace(/([ _][a-z])/g,(function(e){return e.toUpperCase().replace(" ","").replace("_","")}))}},i.initializeEmptyTransform=function(){return{outputRotation:0,flipHorizontally:!1,flipVertically:!1,start:{x:0,y:0},end:{x:1,y:1},rotation:0}},i.deserialzeColor=function(e){return e&&e.rgba?e.rgba:[0,0,0,0]},i.validateVersion=function(e){return i.version===e},i.checkIfPlatformHTML=function(e){return"html5"===e},i.deserializeStickers=function(e){return{identifier:e.identifier,opacity:e.alpha||0,tintMode:e.tintMode||"none",tintColor:i.deserialzeColor(e.tintColor)}},i.checkIsSerialisationValid=function(e){if("string"!=typeof e&&i.validateVersion(e.version))return!0;if("string"==typeof e)throw new Error("Invalid input of type string, please provide an object");return!1},i.deserializeImage=function(e){var i={};return e.image&&(i.image={width:e.image.width,height:e.image.height,data:e.image.data?e.image.data.replace(r(),""):""},i.image.data=i.image.data?r()+i.image.data:""),i},i.prototype.deserializeTransformation=function(t){var r={},o=t.operations.find((function(e){return"orientation"===e.type})),a=t.operations.find((function(e){return"transform"===e.type})),n=e.__read(this.editor.engine.getRootContainers(),1)[0];return this.previewPosition=this.editor.transformToolStore.defaultCropMaskPosition,this.previewSize=this.editor.transformToolStore.maxCropMaskSize,this.imageSpace=n,r.transform=i.initializeEmptyTransform(),null!=o&&(r.transform.outputRotation=o.options.rotation,r.transform.flipHorizontally=o.options.flipHorizontally||!1,r.transform.flipVertically=o.options.flipVertically||!1),a&&(r.transform.start=a.options.start,r.transform.end=a.options.end,r.transform.rotation=a.options.rotation||0,r.transform.identifier=a.options.meta?a.options.meta.identifier:""),r},i.prototype.deserialize=function(t){var o=this,a={};t.meta&&!i.checkIfPlatformHTML(t.meta.platform)&&console.warn("Read serialisation from another Platform");var n=this.editor.engineMediator.output.container.getResolution(),s=this.editor.engineMediator.image.container.getBounds().size;return this.outputSize=n,this.imageSize=s,this.cropSpace=this.editor.engine.getOutputContainer(),this.outputScale=this.cropSpace.getScale(),t.operations.forEach((function(t){switch(t.type){case"filter":a.filter=i.deserializeFilter(t.options);break;case"adjustments":a.adjustment=i.deserializeAdjustments(t.options);break;case"focus":a.focus=o.deserializeFocus(t.options);break;case"sprite":t.options.sprites.forEach((function(t){var r;switch(t.type){case"frame":a.frame=o.deserializeFrame(t.options);break;case"overlay":a.overlay=i.deserializeOverlay(t.options);break;case"brush":a.brush?(r=a.brush.strokes).push.apply(r,e.__spread(o.deserializeBrush(t.options).strokes)):a.brush=o.deserializeBrush(t.options);break;case"sticker":case"text":case"textdesign":a.sprite||(a.sprite={spriteIdList:[],sticker:{},text:{},textdesign:{},common:{}});var n=e.uuid();a.sprite.spriteIdList.push(n),a.sprite.common[n]={order:o.spriteOrder,position:o.mapRelativeCropPointToImageSpace(t.options.position),tool:e.Tool.STICKER,rotation:t.options.rotation||0,flipHorizontally:t.options.flipHorizontally,flipVertically:t.options.flipVertically},o.spriteOrder+=1,t.type===e.Tool.STICKER?(a.sprite.common[n].tool=e.Tool.STICKER,a.sprite.common[n].size={width:o.mapRelativeCropSizeToScaledImageSize(t.options.dimensions.x),height:o.mapRelativeCropSizeToScaledImageSize(t.options.dimensions.y)},a.sprite.sticker[n]=i.deserializeStickers(t.options)):t.type===e.Tool.TEXT?(a.sprite.common[n].tool=e.Tool.TEXT,a.sprite.text[n]=o.deserializeTexts(t.options)):t.type===e.Tool.TEXT_DESIGN&&(a.sprite.common[n].tool=e.Tool.TEXT_DESIGN,a.sprite.textdesign[n]=o.deserializeTextDesign(t.options))}}))}})),t.assetLibrary&&(a.customStickers=t.assetLibrary&&t.assetLibrary.assets&&t.assetLibrary.assets.stickers||[],a.customStickers=a.customStickers.map((function(i){var t=i.raster.data.replace(r(i.raster.type),"");return e.__assign(e.__assign({},i),{raster:e.__assign(e.__assign({},i.raster),{data:r(i.raster.type)+t})})}))),a},i.prototype.deserializeFrame=function(e){return{identifier:e.identifier,opacity:e.alpha,width:this.mapRelativeCropSizeToUnscaledImageSize(e.size),color:i.deserialzeColor(e.tintColor)}},i.prototype.deserializeFocus=function(e){switch(e.type){case"linear":return{identifier:"linear",linear:this.deserializeLinearFocus(e.options)};case"gaussian":return{identifier:"gaussian",gaussian:this.deserializeGaussianFocus(e.options)};case"radial":return{identifier:"radial",radial:this.deserializeRadialFocus(e.options)};case"mirrored":return{identifier:"mirrored",mirrored:this.deserializeMirroredFocus(e.options)}}},i.prototype.deserializeRadialFocus=function(i){return{center:this.mapRelativeCropPointToImageSpace(i.start),radius:new e.Vector2(this.mapRelativeCropPointToImageSpace(i.start)).subtract(new e.Vector2(this.mapRelativeCropPointToImageSpace(i.end))).magnitude,blurRadius:this.mapRelativeCropSizeToScaledImageSize(i.blurRadius)}},i.prototype.deserializeLinearFocus=function(e){return{start:this.mapRelativeCropPointToImageSpace(e.start),end:this.mapRelativeCropPointToImageSpace(e.end),blurRadius:this.mapRelativeCropSizeToScaledImageSize(e.blurRadius)}},i.prototype.deserializeGaussianFocus=function(e){return{blurRadius:this.mapRelativeCropSizeToScaledImageSize(e.blurRadius)}},i.prototype.deserializeMirroredFocus=function(i){var t=new e.Vector2(this.mapRelativeCropPointToImageSpace(i.start)).subtract(new e.Vector2(this.mapRelativeCropPointToImageSpace(i.end)));return{origin:new e.Vector2(this.mapRelativeCropPointToImageSpace(i.start)).add(new e.Vector2(this.mapRelativeCropPointToImageSpace(i.end))).divide(2),rotation:Math.atan2(t.y,t.x),size:this.mapRelativeCropSizeToScaledImageSize(i.size),blurRadius:this.mapRelativeCropSizeToScaledImageSize(i.blurRadius)}},i.prototype.deserializeTexts=function(e){return{identifier:e.fontIdentifier,fontSize:this.mapRelativeCropSizeToScaledImageSize(e.fontSize),width:this.mapRelativeCropSizeToScaledImageSize(e.maxWidth),alignment:e.alignment,textColor:i.deserialzeColor(e.color),backgroundColor:i.deserialzeColor(e.backgroundColor),lineHeight:e.lineHeight,text:e.text}},i.prototype.deserializeTextDesign=function(e){return{identifier:e.identifier,width:this.mapRelativeCropSizeToScaledImageSize(e.width),padding:this.mapRelativeCropSizeToScaledImageSize(e.padding),color:i.deserialzeColor(e.color),seed:e.seed,text:e.text,isInverted:e.inverted}},i.prototype.deserializeBrush=function(e){var t=this;return{strokes:e.paths.map((function(e){return{path:{controlPoints:e.points.map(t.mapRelativeCropPointToImageSpace)},brush:{id:"imgly_brush_radial",color:i.deserialzeColor(e.brush.color),size:t.mapRelativeCropSizeToUnscaledImageSize(e.brush.size),hardness:e.brush.hardness}}}))}},i.version="3.9.0",i}();exports.Deserializer=o,exports.Serializer=t;
