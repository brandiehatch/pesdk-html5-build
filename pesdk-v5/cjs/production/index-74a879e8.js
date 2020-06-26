"use strict";var e=require("./index-5d93f71b.js");require("styled-components");var i=require("./engine.production.min.js");require("react"),require("react-dom"),require("react-dom/server");var t="5.3.0",r=function(){function r(e,t,r,o,a,n){var s=this;this.mapImagePointToRelativeCropPoint=function(e){var t=i.ConversionUtils.pointFromSpaceToSpace(e,s.imageSpace,s.cropSpace,!1);return i.ConversionUtils.absoluteToRelativePoint(t,s.cropSpace,!1)},this.mapSizeToRelativeUnscaledCropSize=function(e){return e/Math.min(s.outputSize.height,s.outputSize.width)},this.mapSizeToRelativeScaledCropSize=function(e){return e/Math.min(s.outputSize.height*s.outputScale.x,s.outputSize.width*s.outputScale.y)},this.getPointInDirection=function(e,i,t){void 0===i&&(i=0),void 0===t&&(t=3);var r=Math.tan(i),o=Math.sqrt(Math.pow(r,2)+1);return{x:e.x+t/o,y:e.y+t*r/o}},this.previewPosition=e,this.previewSize=t,this.outputSize=r,this.imageSize=o,this.imageSpace=a,this.cropSpace=n,this.outputScale=n.getScale()}return r.serializeFilters=function(e){return{type:"filter",options:{intensity:e.intensity,identifier:e.identifier}}},r.serializeAdjustments=function(e){return{type:"adjustments",options:e}},r.serializeOverlay=function(e){return{type:"overlay",options:{identifier:e.identifier,intensity:e.opacity,blendMode:e.blendMode.replace(/[A-Z]/g,(function(e){return" "+e.toLowerCase()}))}}},r.serializeMetaData=function(){return{platform:"html5",version:t,createdAt:(new Date).toISOString()}},r.prototype.serialise=function(i,t,o){var a=this,n=r.serializeMetaData(),s={width:this.imageSize.width,height:this.imageSize.height};t&&(s.type=o,s.data=t);var p=[],l=[],d=i.adjustment;Object.keys(d).map((function(e){return d[e]})).filter(Boolean).length&&p.push(r.serializeAdjustments(d));var u=i.filter;"identity"!==u.identifier&&p.push(r.serializeFilters(u));var c=i.overlay;if("identity"!==c.identifier&&l.push(r.serializeOverlay(c)),i.transform){var m=this.serializeTransform(i.transform),h=m.transform,f=m.orientation,z=[0!==h.options.start.x,0!==h.options.start.y,1!==h.options.end.x,1!==h.options.end.y,0!==h.options.rotation],S=[0!==f.options.rotation,!1!==f.options.flipVertically,!1!==f.options.flipHorizontally];z.some((function(e){return e}))&&p.push(h),S.some((function(e){return e}))&&p.push(f)}var g=i.frame;"identity"!==g.identifier&&l.push(this.serialzeFrame(g));var v=i.focus;if("identity"!==v.identifier&&p.push(this.serializeFocus(v)),i.sprite&&i.sprite.spriteIdList.forEach((function(e){var t=i.sprite.common[e];switch(t.tool){case"sticker":var r=i.sprite.sticker[e];l.push(a.serializeSticker(r,t,i.transform));break;case"text":var o=i.sprite.text[e];l.push(a.serializeText(o,t));break;case"textdesign":var n=i.sprite.textdesign[e];l.push(a.serializeTextDesign(n,t))}})),i.brush.strokes.length&&l.push({type:"brush",options:{paths:i.brush.strokes.map((function(e){return{points:e.path.controlPoints.map(a.mapImagePointToRelativeCropPoint),brush:{color:{rgba:e.brush.color},size:a.mapSizeToRelativeUnscaledCropSize(e.brush.size),hardness:e.brush.hardness}}}))}}),l.length){var y={type:"sprite",options:{sprites:l}};p.push(y)}var T={assets:{stickers:i.customStickers?i.customStickers.map((function(i){return e.__assign({},i,{raster:e.__assign({},i.raster,{data:i.raster.data.replace((t=i.raster.type,void 0===t&&(t=e.ImageFormat.PNG),"data:"+t+";base64,"),"")})});var t})):[]}};return{version:r.version,meta:n,image:s,operations:p,assetLibrary:T}},r.prototype.serialzeFrame=function(e){return{type:"frame",options:{identifier:e.identifier,alpha:e.opacity,tintColor:{rgba:e.color},size:this.mapSizeToRelativeUnscaledCropSize(e.width)}}},r.prototype.serializeFocus=function(i){var t=Math.sqrt(Math.pow(this.previewSize.width,2)+Math.pow(this.previewSize.height,2));switch(i.identifier){case e.FocusIdentifier.LINEAR:return{type:"focus",options:{type:"linear",options:{start:this.mapImagePointToRelativeCropPoint(i.linear.start),end:this.mapImagePointToRelativeCropPoint(i.linear.end),blurRadius:this.mapSizeToRelativeScaledCropSize(i.linear.blurRadius)}}};case e.FocusIdentifier.RADIAL:return{type:"focus",options:{type:"radial",options:{start:this.mapImagePointToRelativeCropPoint(i.radial.center),end:this.mapImagePointToRelativeCropPoint(this.getPointInDirection(i.radial.center,0,i.radial.radius)),blurRadius:this.mapSizeToRelativeScaledCropSize(i.radial.blurRadius),gradientRadius:.1}}};case e.FocusIdentifier.MIRRORED:var r=i.mirrored;return{type:"focus",options:{type:"mirrored",options:{start:this.mapImagePointToRelativeCropPoint(this.getPointInDirection(r.origin,r.rotation,t/2)),end:this.mapImagePointToRelativeCropPoint(this.getPointInDirection(r.origin,r.rotation,-t/2)),size:this.mapSizeToRelativeScaledCropSize(i.mirrored.size),blurRadius:this.mapSizeToRelativeScaledCropSize(i.mirrored.blurRadius),gradientSize:.1}}};default:return{type:"focus",options:{type:"gaussian",options:{blurRadius:this.mapSizeToRelativeScaledCropSize(i.gaussian.blurRadius)}}}}},r.prototype.serializeSticker=function(e,i,t){return{type:"sticker",options:{position:this.mapImagePointToRelativeCropPoint(i.position),dimensions:{x:this.mapSizeToRelativeScaledCropSize(i.size.width),y:this.mapSizeToRelativeScaledCropSize(i.size.height)},rotation:i.rotation,flipVertically:(i.flipVertically||!1)!==(t.flipVertically||!1),flipHorizontally:(i.flipHorizontally||!1)!==(t.flipHorizontally||!1),identifier:e.identifier,alpha:e.opacity,tintColor:{rgba:e.tintColor},tintMode:e.tintMode}}},r.prototype.serializeText=function(e,i){return{type:"text",options:{position:this.mapImagePointToRelativeCropPoint(i.position),rotation:i.rotation,flipVertically:!1,flipHorizontally:!1,fontIdentifier:e.identifier,fontSize:this.mapSizeToRelativeScaledCropSize(e.fontSize),maxWidth:this.mapSizeToRelativeScaledCropSize(e.width),text:e.text,lineHeight:e.lineHeight,color:{rgba:e.textColor},backgroundColor:{rgba:e.backgroundColor},alignment:e.alignment}}},r.prototype.serializeTextDesign=function(e,i){return{type:"textdesign",options:{position:this.mapImagePointToRelativeCropPoint(i.position),rotation:i.rotation,flipVertically:!1,flipHorizontally:!1,identifier:e.identifier,inverted:e.isInverted,text:e.text,seed:e.seed,width:this.mapSizeToRelativeScaledCropSize(e.width),padding:this.mapSizeToRelativeScaledCropSize(e.padding),color:{rgba:e.color}}}},r.prototype.serializeTransform=function(e){return{transform:{type:"transform",options:{start:e.start,end:e.end,rotation:e.rotation,meta:{identifier:e.identifier}}},orientation:{type:"orientation",options:{rotation:e.outputRotation,flipHorizontally:e.flipHorizontally,flipVertically:e.flipVertically}}}},r.version="3.9.0",r}(),o=function(i){return void 0===i&&(i=e.ImageFormat.PNG),"data:"+i+";base64,"},a=function(){function t(e){var t=this;this.spriteOrder=0,this.mapRelativeCropPointToImageSpace=function(e){var r=i.ConversionUtils.relativeToAbsolutePoint(e,t.cropSpace,!1);return i.ConversionUtils.pointFromSpaceToSpace(r,t.cropSpace,t.imageSpace,!1)},this.mapRelativeCropSizeToScaledImageSize=function(e){return e*Math.min(t.outputSize.height*t.outputScale.x,t.outputSize.width*t.outputScale.y)},this.mapRelativeCropSizeToUnscaledImageSize=function(e){return e*Math.min(t.outputSize.height,t.outputSize.width)},this.editor=e}return t.deserializeFilter=function(e){return{intensity:e.intensity,identifier:e.identifier}},t.deserializeAdjustments=function(i){return e.__assign({},i)},t.deserializeOverlay=function(e){return{identifier:e.identifier,opacity:e.intensity,blendMode:e.blendMode.replace(/([ _][a-z])/g,(function(e){return e.toUpperCase().replace(" ","").replace("_","")}))}},t.initializeEmptyTransform=function(){return{outputRotation:0,flipHorizontally:!1,flipVertically:!1,start:{x:0,y:0},end:{x:1,y:1},rotation:0}},t.deserialzeColor=function(e){return e&&e.rgba?e.rgba:[0,0,0,0]},t.validateVersion=function(e){return t.version===e},t.checkIfPlatformHTML=function(e){return"html5"===e},t.deserializeStickers=function(e){return{identifier:e.identifier,opacity:e.alpha||0,tintMode:e.tintMode||"none",tintColor:t.deserialzeColor(e.tintColor)}},t.checkIsSerialisationValid=function(e){if("string"!=typeof e&&t.validateVersion(e.version))return!0;if("string"==typeof e)throw new Error("Invalid input of type string, please provide an object");return!1},t.deserializeImage=function(e){var i={};return e.image&&(i.image={width:e.image.width,height:e.image.height,data:e.image.data?e.image.data.replace(o(),""):""},i.image.data=i.image.data?o()+i.image.data:""),i},t.prototype.deserializeTransformation=function(i){var r={},o=i.operations.find((function(e){return"orientation"===e.type})),a=i.operations.find((function(e){return"transform"===e.type})),n=e.__read(this.editor.engine.getRootContainers(),1)[0];return this.previewPosition=this.editor.transformToolStore.defaultCropMaskPosition,this.previewSize=this.editor.transformToolStore.maxCropMaskSize,this.imageSpace=n,r.transform=t.initializeEmptyTransform(),null!=o&&(r.transform.outputRotation=o.options.rotation,r.transform.flipHorizontally=o.options.flipHorizontally||!1,r.transform.flipVertically=o.options.flipVertically||!1),a&&(r.transform.start=a.options.start,r.transform.end=a.options.end,r.transform.rotation=a.options.rotation||0,r.transform.identifier=a.options.meta?a.options.meta.identifier:""),r},t.prototype.deserialize=function(i){var r=this,a={};i.meta&&!t.checkIfPlatformHTML(i.meta.platform)&&console.warn("Read serialisation from another Platform");var n=this.editor.engineMediator.output.container.getResolution(),s=this.editor.engineMediator.image.container.getBounds().size;return this.outputSize=n,this.imageSize=s,this.cropSpace=this.editor.engine.getOutputContainer(),this.outputScale=this.cropSpace.getScale(),i.operations.forEach((function(i){switch(i.type){case"filter":a.filter=t.deserializeFilter(i.options);break;case"adjustments":a.adjustment=t.deserializeAdjustments(i.options);break;case"focus":a.focus=r.deserializeFocus(i.options);break;case"sprite":i.options.sprites.forEach((function(i){var o;switch(i.type){case"frame":a.frame=r.deserializeFrame(i.options);break;case"overlay":a.overlay=t.deserializeOverlay(i.options);break;case"brush":a.brush?(o=a.brush.strokes).push.apply(o,e.__spread(r.deserializeBrush(i.options).strokes)):a.brush=r.deserializeBrush(i.options);break;case"sticker":case"text":case"textdesign":a.sprite||(a.sprite={spriteIdList:[],sticker:{},text:{},textdesign:{},common:{}});var n=e.uuid();a.sprite.spriteIdList.push(n),a.sprite.common[n]={order:r.spriteOrder,position:r.mapRelativeCropPointToImageSpace(i.options.position),tool:e.Tool.STICKER,rotation:i.options.rotation||0,flipHorizontally:i.options.flipHorizontally,flipVertically:i.options.flipVertically},r.spriteOrder+=1,i.type===e.Tool.STICKER?(a.sprite.common[n].tool=e.Tool.STICKER,a.sprite.common[n].size={width:r.mapRelativeCropSizeToScaledImageSize(i.options.dimensions.x),height:r.mapRelativeCropSizeToScaledImageSize(i.options.dimensions.y)},a.sprite.sticker[n]=t.deserializeStickers(i.options)):i.type===e.Tool.TEXT?(a.sprite.common[n].tool=e.Tool.TEXT,a.sprite.text[n]=r.deserializeTexts(i.options)):i.type===e.Tool.TEXT_DESIGN&&(a.sprite.common[n].tool=e.Tool.TEXT_DESIGN,a.sprite.textdesign[n]=r.deserializeTextDesign(i.options))}}))}})),i.assetLibrary&&(a.customStickers=i.assetLibrary&&i.assetLibrary.assets&&i.assetLibrary.assets.stickers||[],a.customStickers=a.customStickers.map((function(i){var t=i.raster.data.replace(o(i.raster.type),"");return e.__assign({},i,{raster:e.__assign({},i.raster,{data:o(i.raster.type)+t})})}))),a},t.prototype.deserializeFrame=function(e){return{identifier:e.identifier,opacity:e.alpha,width:this.mapRelativeCropSizeToUnscaledImageSize(e.size),color:t.deserialzeColor(e.tintColor)}},t.prototype.deserializeFocus=function(e){switch(e.type){case"linear":return{identifier:"linear",linear:this.deserializeLinearFocus(e.options)};case"gaussian":return{identifier:"gaussian",gaussian:this.deserializeGaussianFocus(e.options)};case"radial":return{identifier:"radial",radial:this.deserializeRadialFocus(e.options)};case"mirrored":return{identifier:"mirrored",mirrored:this.deserializeMirroredFocus(e.options)}}},t.prototype.deserializeRadialFocus=function(i){return{center:this.mapRelativeCropPointToImageSpace(i.start),radius:new e.Vector2(this.mapRelativeCropPointToImageSpace(i.start)).subtract(new e.Vector2(this.mapRelativeCropPointToImageSpace(i.end))).magnitude,blurRadius:this.mapRelativeCropSizeToScaledImageSize(i.blurRadius)}},t.prototype.deserializeLinearFocus=function(e){return{start:this.mapRelativeCropPointToImageSpace(e.start),end:this.mapRelativeCropPointToImageSpace(e.end),blurRadius:this.mapRelativeCropSizeToScaledImageSize(e.blurRadius)}},t.prototype.deserializeGaussianFocus=function(e){return{blurRadius:this.mapRelativeCropSizeToScaledImageSize(e.blurRadius)}},t.prototype.deserializeMirroredFocus=function(i){var t=new e.Vector2(this.mapRelativeCropPointToImageSpace(i.start)).subtract(new e.Vector2(this.mapRelativeCropPointToImageSpace(i.end)));return{origin:new e.Vector2(this.mapRelativeCropPointToImageSpace(i.start)).add(new e.Vector2(this.mapRelativeCropPointToImageSpace(i.end))).divide(2),rotation:Math.atan2(t.y,t.x),size:this.mapRelativeCropSizeToScaledImageSize(i.size),blurRadius:this.mapRelativeCropSizeToScaledImageSize(i.blurRadius)}},t.prototype.deserializeTexts=function(e){return{identifier:e.fontIdentifier,fontSize:this.mapRelativeCropSizeToScaledImageSize(e.fontSize),width:this.mapRelativeCropSizeToScaledImageSize(e.maxWidth),alignment:e.alignment,textColor:t.deserialzeColor(e.color),backgroundColor:t.deserialzeColor(e.backgroundColor),lineHeight:e.lineHeight,text:e.text}},t.prototype.deserializeTextDesign=function(e){return{identifier:e.identifier,width:this.mapRelativeCropSizeToScaledImageSize(e.width),padding:this.mapRelativeCropSizeToScaledImageSize(e.padding),color:t.deserialzeColor(e.color),seed:e.seed,text:e.text,isInverted:e.inverted}},t.prototype.deserializeBrush=function(e){var i=this;return{strokes:e.paths.map((function(e){return{path:{controlPoints:e.points.map(i.mapRelativeCropPointToImageSpace)},brush:{id:"imgly_brush_radial",color:t.deserialzeColor(e.brush.color),size:i.mapRelativeCropSizeToUnscaledImageSize(e.brush.size),hardness:e.brush.hardness}}}))}},t.version="3.9.0",t}();exports.Deserializer=a,exports.Serializer=r;