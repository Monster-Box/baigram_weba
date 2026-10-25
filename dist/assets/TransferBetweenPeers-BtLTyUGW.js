import{$t as e,r as t,t as n}from"./fasterdom-C760DfsB.js";import{C as r,b as i,d as a,g as o,v as s,x as c,y as l}from"./teact-CjMWm-hh.js";import{Cp as u,E as d,Qa as f,Sp as p,V as m,Va as h,Xa as g,Yc as _,Z as v,Zc as y,_c as b,k as x,mp as S,n as C,r as w,vl as T,w as E,xp as D}from"./InputText-DA33KBA3.js";import{ot as O,u as k}from"./colors-BeFUQKVJ.js";import{h as ee}from"./usePrevious-mN2cV2g2.js";import{T as te}from"./Transition-ClJzHWPR.js";import{S as ne,m as A,p as j,r as M}from"./Checkbox-x8MS1iRm.js";import{n as re}from"./animatedAssets-Bsv7ZybF.js";import{r as N}from"./animation-D4wj_PSL.js";import{t as P}from"./Modal-__dZwG76.js";import{r as F}from"./Skeleton-faB5ZLiN.js";import{Bt as ie,Ht as ae,It as oe,J as se,W as ce}from"./ActionMessage-DKt4wltz.js";var le=a(({ref:r,id:i,className:a,value:s,label:f,error:m,success:h,disabled:g,readOnly:_,placeholder:v,autoComplete:b,inputMode:x,maxLength:S,maxLengthIndicator:w,hasLengthIndicator:E,tabIndex:D,onChange:O,onInput:k,onKeyPress:ee,onKeyDown:te,onBlur:ne,onPaste:A,noReplaceNewlines:j})=>{let M=c();r&&(M=r);let re=d(),N=m||h||f,P=T(`input-group`,s&&`touched`,m?`error`:h&&`success`,g&&`disabled`,_&&`disabled`,N&&`with-label`,a),F=y(e=>{t(()=>{e.style.height=`0`,n(()=>{let t=e.scrollHeight;return()=>{e.style.height=`${t}px`}})})});l(()=>{let e=M.current;e&&F(e)},[]);let ie=o(e=>{let t=e.currentTarget;if(!j){let e=t.selectionEnd;t.value=t.value.replace(/\n/g,` `),t.selectionEnd=e}F(t),O?.(e)},[j,O]);return u(`div`,{className:P,dir:re.isRtl?`rtl`:void 0,children:[p(`textarea`,{ref:M,className:`form-control`,id:i,dir:`auto`,value:s||``,tabIndex:D,placeholder:v,maxLength:S,autoComplete:b,spellCheck:!e&&void 0,inputMode:x,disabled:g,readOnly:_,onChange:ie,onInput:k,onKeyPress:ee,onKeyDown:te,onBlur:ne,onPaste:A,"aria-label":N}),N&&p(`label`,{htmlFor:i,children:N}),(w||E&&S!==void 0)&&p(`div`,{className:`max-length-indicator`,children:p(C,{text:w||Math.max(0,S-(s||``).length).toString()})})]})}),I={root:`Kdv89j1l`,top:`_0EdTY2mJ`,badge:`TvB5YSlK`,text:`lZY9nXge`},ue=a(({peer:e,avatarWebPhoto:t,avatarSize:n,text:r,badgeText:i,badgeIcon:a,className:o,badgeClassName:s,badgeIconClassName:c,textClassName:l,onClick:d})=>{let m=E();return u(`div`,{className:T(I.root,d&&I.clickable,o),onClick:d,children:[u(`div`,{className:I.top,children:[p(M,{size:n,peer:e,webPhoto:t}),i&&u(`div`,{className:T(I.badge,s),dir:m.isRtl?`rtl`:`ltr`,children:[a&&p(f,{name:a,className:c}),i]})]}),r&&p(`p`,{className:T(I.text,l),children:r})]})}),de=new k(`#0098EA`),L={blue:de,blueGradient:[new k(`#0158AF`),new k(`#67D0FF`)],purple:new k(`#966FFE`),purpleGradient:[new k(`#6B93FF`),new k(`#E46ACE`)],gold:new k(`#FFBF0A`),goldGradient:[new k(`#FDEB32`),new k(`#D75902`)]},fe={particleCount:5,distanceLimit:1,fadeInTime:.05,minLifetime:3,maxLifetime:3,maxStartTimeDelay:0,selfDestroyTime:3,minSpawnRadius:5,maxSpawnRadius:50},R={width:350,height:230,particleCount:100,color:de,speed:18,baseSize:6,minSpawnRadius:35,maxSpawnRadius:70,distanceLimit:.7,fadeInTime:.25,fadeOutTime:1,minLifetime:4,maxLifetime:6,maxStartTimeDelay:3,edgeFadeZone:50,centerShift:[0,0],accelerationFactor:3,selfDestroyTime:0},pe=.67,me=1.33,he=2.2,z=new Map;function B(e,t){let n=z.get(e);return n||(n=ge(e),z.set(e,n)),n.addSystem(t)}function ge(e){let t=e.getContext(`webgl`,{alpha:!0,antialias:!1,preserveDrawingBuffer:!1});if(!t)throw Error(`WebGL not supported`);let n=V(t,t.VERTEX_SHADER,_e),r=V(t,t.FRAGMENT_SHADER,ve);if(!n||!r)throw Error(`Failed to create shaders`);let i=ye(t,n,r);if(!i)throw Error(`Failed to create shader program`);let a=window.devicePixelRatio||1,o=new Map,s={attributes:{startPosition:t.getAttribLocation(i,`a_startPosition`),velocity:t.getAttribLocation(i,`a_velocity`),startTime:t.getAttribLocation(i,`a_startTime`),lifetime:t.getAttribLocation(i,`a_lifetime`),size:t.getAttribLocation(i,`a_size`),baseOpacity:t.getAttribLocation(i,`a_baseOpacity`),color:t.getAttribLocation(i,`a_color`)},uniforms:{resolution:t.getUniformLocation(i,`u_resolution`),time:t.getUniformLocation(i,`u_time`),canvasWidth:t.getUniformLocation(i,`u_canvasWidth`),canvasHeight:t.getUniformLocation(i,`u_canvasHeight`),accelerationFactor:t.getUniformLocation(i,`u_accelerationFactor`),fadeInTime:t.getUniformLocation(i,`u_fadeInTime`),fadeOutTime:t.getUniformLocation(i,`u_fadeOutTime`),edgeFadeZone:t.getUniformLocation(i,`u_edgeFadeZone`),rotationMatrices:t.getUniformLocation(i,`u_rotationMatrices`),spawnCenter:t.getUniformLocation(i,`u_spawnCenter`)}},c,l;function u(e){let n=new be(e.seed),{config:r}=e,i=new Float32Array(r.particleCount*2),o=new Float32Array(r.particleCount*2),s=new Float32Array(r.particleCount),c=new Float32Array(r.particleCount),l=new Float32Array(r.particleCount),u=new Float32Array(r.particleCount),d=new Float32Array(r.particleCount*3);for(let t=0;t<r.particleCount;t++){let f=n.next()*Math.PI*2,p=n.nextBetween(r.minSpawnRadius,r.maxSpawnRadius),m=Math.cos(f),h=Math.sin(f),g=e.centerX+m*p,_=e.centerY+h*p;i[t*2]=g*a,i[t*2+1]=_*a,c[t]=n.nextBetween(r.minLifetime,r.maxLifetime),s[t]=n.next()*r.maxStartTimeDelay;let v=n.nextBetween(e.avgDistance*r.distanceLimit*.5,e.avgDistance*r.distanceLimit)/c[t]*a;o[t*2]=m*v,o[t*2+1]=h*v;let y=n.next();y<.3?l[t]=r.baseSize*pe*a:y<.7?l[t]=r.baseSize*me*a:l[t]=r.baseSize*he*a,u[t]=n.nextBetween(.3,.8);let[b,x,S]=Se(r.color,n).coords;d[t*3]=b||0,d[t*3+1]=x||0,d[t*3+2]=S||0}t.bindBuffer(t.ARRAY_BUFFER,e.buffers.startPosition),t.bufferData(t.ARRAY_BUFFER,i,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,e.buffers.velocity),t.bufferData(t.ARRAY_BUFFER,o,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,e.buffers.startTime),t.bufferData(t.ARRAY_BUFFER,s,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,e.buffers.lifetime),t.bufferData(t.ARRAY_BUFFER,c,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,e.buffers.size),t.bufferData(t.ARRAY_BUFFER,l,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,e.buffers.baseOpacity),t.bufferData(t.ARRAY_BUFFER,u,t.STATIC_DRAW),t.bindBuffer(t.ARRAY_BUFFER,e.buffers.color),t.bufferData(t.ARRAY_BUFFER,d,t.STATIC_DRAW)}function d(){let n=0,r=0;o.forEach(e=>{n=Math.max(n,e.config.width),r=Math.max(r,e.config.height)}),o.size===0&&(n=R.width,r=R.height),(e.width!==n*a||e.height!==r*a)&&(e.width=n*a,e.height=r*a,e.style.width=n+`px`,e.style.height=r+`px`),t.viewport(0,0,e.width,e.height)}function f(){t.useProgram(i),t.uniform2f(s.uniforms.resolution,e.width,e.height),t.uniformMatrix2fv(s.uniforms.rotationMatrices,!1,xe()),t.enable(t.BLEND),t.blendFunc(t.ONE,t.ONE_MINUS_SRC_ALPHA),t.clearColor(0,0,0,0)}function p(e){c&&=(t.clear(t.COLOR_BUFFER_BIT),o.forEach(n=>{let r=(e-n.startTime)/1e3;t.uniform1f(s.uniforms.time,r),t.uniform1f(s.uniforms.canvasWidth,n.config.width*a),t.uniform1f(s.uniforms.canvasHeight,n.config.height*a),t.uniform1f(s.uniforms.accelerationFactor,n.config.accelerationFactor),t.uniform1f(s.uniforms.fadeInTime,n.config.fadeInTime),t.uniform1f(s.uniforms.fadeOutTime,n.config.fadeOutTime),t.uniform1f(s.uniforms.edgeFadeZone,n.config.edgeFadeZone*a),t.uniform2f(s.uniforms.spawnCenter,n.centerX*a,n.centerY*a),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.startPosition),t.enableVertexAttribArray(s.attributes.startPosition),t.vertexAttribPointer(s.attributes.startPosition,2,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.velocity),t.enableVertexAttribArray(s.attributes.velocity),t.vertexAttribPointer(s.attributes.velocity,2,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.startTime),t.enableVertexAttribArray(s.attributes.startTime),t.vertexAttribPointer(s.attributes.startTime,1,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.lifetime),t.enableVertexAttribArray(s.attributes.lifetime),t.vertexAttribPointer(s.attributes.lifetime,1,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.size),t.enableVertexAttribArray(s.attributes.size),t.vertexAttribPointer(s.attributes.size,1,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.baseOpacity),t.enableVertexAttribArray(s.attributes.baseOpacity),t.vertexAttribPointer(s.attributes.baseOpacity,1,t.FLOAT,!1,0,0),t.bindBuffer(t.ARRAY_BUFFER,n.buffers.color),t.enableVertexAttribArray(s.attributes.color),t.vertexAttribPointer(s.attributes.color,3,t.FLOAT,!1,0,0),t.drawArrays(t.POINTS,0,n.config.particleCount)}),requestAnimationFrame(p))}function m(e){let n=O(),r={...R,...e},i={id:n,config:r,buffers:{startPosition:t.createBuffer(),velocity:t.createBuffer(),startTime:t.createBuffer(),lifetime:t.createBuffer(),size:t.createBuffer(),baseOpacity:t.createBuffer(),color:t.createBuffer()},startTime:performance.now(),seed:Math.floor(Math.random()*1e6),centerX:r.width/2+r.centerShift[0],centerY:r.height/2+r.centerShift[1],avgDistance:(r.width/2+r.height/2)/2};return o.set(n,i),u(i),d(),r.selfDestroyTime&&(i.selfDestroyTimeout=window.setTimeout(()=>{h(n)},r.selfDestroyTime*1e3)),o.size===1&&(f(),l=x.subscribe(()=>{let e=!x();e&&!c?c=requestAnimationFrame(p):!e&&c&&(cancelAnimationFrame(c),c=void 0)}),c=requestAnimationFrame(p)),()=>h(n)}function h(e){let n=o.get(e);n&&(n.selfDestroyTimeout&&clearTimeout(n.selfDestroyTimeout),Object.values(n.buffers).forEach(e=>{e&&t.deleteBuffer(e)}),o.delete(e),o.size===0&&g())}function g(){c!==void 0&&(cancelAnimationFrame(c),c=void 0),l?.(),o.clear(),t.deleteProgram(i),t.deleteShader(n),t.deleteShader(r),z.delete(e)}return{addSystem:m}}var _e=`
    attribute vec2 a_startPosition;
    attribute vec2 a_velocity;
    attribute float a_startTime;
    attribute float a_lifetime;
    attribute float a_size;
    attribute float a_baseOpacity;
    attribute vec3 a_color;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform float u_canvasWidth;
    uniform float u_canvasHeight;
    uniform float u_accelerationFactor;
    uniform float u_fadeInTime;
    uniform float u_fadeOutTime;
    uniform float u_edgeFadeZone;
    uniform mat2 u_rotationMatrices[18];
    uniform vec2 u_spawnCenter;

    varying float v_opacity;
    varying vec3 v_color;

    void main() {
        float totalAge = u_time - a_startTime;
        float age = mod(totalAge, a_lifetime);

        // For the initial animation, fade in all particles
        float globalFadeIn = min(u_time / u_fadeInTime, 1.0);

        float lifeRatio = age / a_lifetime;

        // Calculate rotation based on completed lifecycles
        float lifecycleCount = floor(totalAge / a_lifetime);
        int rotationIndex = int(mod(lifecycleCount, 18.0));

        // Get rotation matrix
        mat2 rotationMatrix = u_rotationMatrices[rotationIndex];

        // Rotate start position around spawn center
        vec2 startOffset = a_startPosition - u_spawnCenter;
        vec2 rotatedStartOffset = rotationMatrix * startOffset;
        vec2 rotatedStartPosition = u_spawnCenter + rotatedStartOffset;

        // Apply rotation matrix to velocity
        vec2 rotatedVelocity = rotationMatrix * a_velocity;

        // Apply shoot-out effect: fast initial speed that slows down
        float speedMultiplier = 1.0 + u_accelerationFactor * exp(-3.0 * lifeRatio);

        vec2 position = rotatedStartPosition + rotatedVelocity * age * speedMultiplier;

        float opacity = 1.0;
        if (lifeRatio < u_fadeInTime / a_lifetime) {
            opacity = (lifeRatio * a_lifetime) / u_fadeInTime;
        } else if (lifeRatio > 1.0 - u_fadeOutTime / a_lifetime) {
            opacity = (1.0 - lifeRatio) * a_lifetime / u_fadeOutTime;
        }
        opacity *= a_baseOpacity * globalFadeIn;

        float distToLeft = position.x;
        float distToRight = u_canvasWidth - position.x;
        float distToTop = position.y;
        float distToBottom = u_canvasHeight - position.y;
        float distToEdge = min(min(distToLeft, distToRight), min(distToTop, distToBottom));

        if (distToEdge < u_edgeFadeZone) {
            opacity *= distToEdge / u_edgeFadeZone;
        }

        vec2 clipSpace = ((position / u_resolution) * 2.0 - 1.0) * vec2(1, -1);
        gl_Position = vec4(clipSpace, 0, 1);
        gl_PointSize = a_size;
        v_opacity = opacity;
        v_color = a_color;
    }
`,ve=`
    precision mediump float;

    varying float v_opacity;
    varying vec3 v_color;

    void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);

        // Create a four-pointed star
        float absX = abs(coord.x);
        float absY = abs(coord.y);

        // Star parameters
        float innerSize = 0.12;    // Size of center square
        float armLength = 0.45;    // Length of star arms
        float armWidth = 0.08;     // Half-width of star arms at base

        float dist = 1.0; // Default to outside

        // Center square
        if (absX <= innerSize && absY <= innerSize) {
            dist = max(absX, absY) - innerSize;
        }
        // Horizontal arms (left and right points)
        else if (absY <= armWidth && absX <= armLength) {
            // Taper the arms - they get narrower toward the tips
            float normalizedX = (absX - innerSize) / (armLength - innerSize);
            float taperFactor = 1.0 - normalizedX * 0.8; // Taper to 20% of original width
            float currentArmWidth = armWidth * taperFactor;
            dist = absY - currentArmWidth;
        }
        // Vertical arms (top and bottom points)
        else if (absX <= armWidth && absY <= armLength) {
            // Taper the arms - they get narrower toward the tips
            float normalizedY = (absY - innerSize) / (armLength - innerSize);
            float taperFactor = 1.0 - normalizedY * 0.8; // Taper to 20% of original width
            float currentArmWidth = armWidth * taperFactor;
            dist = absX - currentArmWidth;
        }

        // Use smoothstep for anti-aliasing to reduce subpixel artifacts
        float alpha = 1.0 - smoothstep(-0.01, 0.01, dist);

        if (alpha <= 0.0) {
            discard;
        }

        gl_FragColor = vec4(v_color * v_opacity * alpha, v_opacity * alpha);
    }
`;function V(e,t,n){let r=e.createShader(t);if(r){if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS)){e.deleteShader(r);return}return r}}function ye(e,t,n){let r=e.createProgram();if(r){if(e.attachShader(r,t),e.attachShader(r,n),e.linkProgram(r),!e.getProgramParameter(r,e.LINK_STATUS)){e.deleteProgram(r);return}return r}}var be=class{seed;constructor(e){this.seed=e}next(){return this.seed=(this.seed*9301+49297)%233280,this.seed/233280}nextBetween(e,t){return e+(t-e)*this.next()}},H;function xe(){if(!H){H=new Float32Array(72);for(let e=0;e<18;e++){let t=220*Math.PI/180*e,n=Math.cos(t),r=Math.sin(t);H[e*4]=n,H[e*4+1]=r,H[e*4+2]=-r,H[e*4+3]=n}}return H}function Se(e,t){if(e instanceof k)return e;let[n,r]=e,[i,a,o]=n.coords,[s,c,l]=r.coords;return new k(`srgb`,[t.nextBetween(i||0,s||0),t.nextBetween(a||0,c||0),t.nextBetween(o||0,l||0)])}var Ce={sparkles:`JxY8hVTW`},we={centerShift:[0,-36]},Te=8,Ee=a(({color:e=`purple`,centerShift:t=we.centerShift,isDisabled:n,className:r,onRequestAnimation:i})=>{let a=c(),o=c(0);return l(()=>{if(!n)return B(a.current,{color:L[`${e}Gradient`],centerShift:t})},[t,e,n]),s(()=>{i&&i(()=>{if(n)return;let r=Date.now();r-o.current<Te||(o.current=r,B(a.current,{color:L[`${e}Gradient`],centerShift:t,...fe}))})},[t,e,n,i]),p(`canvas`,{ref:a,className:T(Ce.sparkles,r)})}),De={root:`CHDf16MJ`,diamond:`UM7C8oRj`},Oe=``+new URL(`diamond-57JalFxA.png`,import.meta.url).href,ke=5,Ae=1,je=300,Me=1500,U,W=!0,Ne={isCancelled:!1};function Pe({className:e,onMouseMove:n}){let[i,a]=r(Ae),o=y(()=>{U&&=(clearTimeout(U),void 0),U=window.setTimeout(()=>{let e=Date.now();W=!0,N(()=>{if(!W)return!1;let t=Math.min((Date.now()-e)/Me,1),n=4*(1-Ie(t));return a(n),W=t<1&&n>1,W},t,Ne)},je),W=!1,a(ke),n()});return p(`div`,{className:T(De.root,e),children:p(`div`,{className:De.diamond,onMouseMove:o,children:p(ee,{speed:i,size:130,tgsUrl:re.Diamond,previewUrl:Oe,nonInteractive:!0,noLoop:!1})})})}var Fe=a(Pe);function Ie(e){return 1-(1-e)**2}var G={root:`QcfrGLdX`,star:`nDPg-zs5`,star_purple:`-f2S1Tk6`,starPurple:`-f2S1Tk6`},Le=50;function Re({className:e,color:n,centerShift:r,onMouseMove:i}){let a=c(),o=y(e=>{let n=e.currentTarget.getBoundingClientRect(),o=n.left+n.width/2+r[0],s=n.top+n.height/2+r[1],c=e.clientX-o,l=e.clientY-s,u=Math.max(-1,Math.min(1,c/Le)),d=Math.max(-1,Math.min(1,l/Le)),f=u*40,p=-d*40;t(()=>{a.current.style.transform=`scale(1.1) rotateX(${p}deg) rotateY(${f}deg)`}),i()}),s=y(()=>{t(()=>{a.current.style.transform=``})});return p(`div`,{className:T(G.root,e),onMouseMove:o,onMouseLeave:s,children:p(`div`,{ref:a,className:T(G.star,G[`star_${n}`]),role:`img`,"aria-label":`Stars`})})}var ze=a(Re),K={root:`cK6KQXnQ`,particles:`_8ooQ3s8b`,title:`xRm-Im3m`,description:`IQdQ9MU9`,stickerWrapper:`hHs2sTV-`},q=8*v,Be={centerShift:[0,-36]};function Ve({model:e,sticker:t,color:n,title:r,description:i,isDisabled:a,className:o,modelClassName:s}){let l=c(),d=c(),f=y(()=>{d.current?.()}),m=y(e=>{d.current=e});return u(`div`,{className:T(K.root,K[e],o),children:[p(Ee,{color:n,centerShift:Be.centerShift,isDisabled:a,className:K.particles,onRequestAnimation:m}),e===`swaying-star`?p(ze,{className:s,color:n,centerShift:Be.centerShift,onMouseMove:f}):e===`speeding-diamond`?p(Fe,{className:s,onMouseMove:f}):e===`sticker`&&t&&p(`div`,{ref:l,className:T(K.stickerWrapper,s),style:`width: ${q}px; height: ${q}px`,onMouseMove:f,children:p(j,{containerRef:l,sticker:t,size:q,shouldPreloadPreview:!0,shouldLoop:!0})}),p(`h2`,{className:K.title,children:r}),p(`div`,{className:K.description,children:i})]})}var He=a(Ve),J={root:`_7NV36hp3`,wrapper:`_32sWnI-2`,down:`DkDmNeYG`,frame:`M0hUT4cv`,video:`eWi57MWV`,placeholder:`A38HRiXg`},Ue=``+new URL(`DeviceFrame-Dqm_t18H.svg`,import.meta.url).href,We=a(({videoId:e,videoThumbnail:t,isActive:n,isReverseAnimation:r,isDown:i,index:a,className:o,wrapperClassName:s})=>{let c=ne(e?`document${e}`:void 0),l=oe(t?.dataUri),d=te(c);return p(`div`,{className:T(J.root,o),children:u(`div`,{className:T(J.wrapper,r&&J.reverse,i&&J.down,s),id:a===void 0?void 0:`premium_feature_preview_video_${a}`,children:[p(`img`,{src:Ue,alt:``,className:J.frame,draggable:!1}),!e&&p(`div`,{className:J.placeholder}),t&&p(`canvas`,{ref:l,className:J.video}),e&&p(A,{canPlay:!!n,className:T(J.video,d),src:c,disablePictureInPicture:!0,playsInline:!0,muted:!0,loop:!0})]})})}),Y={options:`Upert7zo`,option:`_2X6-9ciP`,active:`zpGahRpW`,wideOption:`dI8-J8yI`,optionTop:`wgA5YkCl`,stackedStars:`TZ71sXrE`,stackedStar:`_6CGkOJue`,optionBottom:`GRPtw1Lm`,moreOptions:`cY6CHTaj`,iconDown:`qdRs-uv4`},Ge=6,Ke=a(({isActive:e,className:t,options:n,selectedStarOption:r,selectedStarCount:a,starsNeeded:o,onClick:c})=>{let l=d(),v=E(),[y,x,S]=m();s(()=>{e||S()},[e]);let[C,D]=i(()=>{if(!n)return[void 0,!1];let e=n.reduce((e,t)=>e.stars>t.stars?e:t),t=o&&e.stars<o,r=[],i=0,a=!1;return n.forEach((e,s)=>{if(e.isExtended||i++,!(o&&!t&&e.stars<o)){if(!y&&e.isExtended){a=!0;return}r.push({option:e,starsCount:Math.min(i,Ge),isWide:s===n.length-1})}}),[r,a]},[y,n,o]);return u(`div`,{className:T(Y.options,t),children:[C?.map(({option:e,starsCount:t,isWide:n})=>{let i=C?.length%2==0,o=e===r,s;return e&&`winners`in e&&(s=(e.winners.find(e=>e.users===a)||e.winners.reduce((e,t)=>t.users>e.users?t:e,e.winners[0]))?.perUserStars),u(`div`,{className:T(Y.option,!i&&n&&Y.wideOption,o&&Y.active),onClick:()=>c?.(e),children:[u(`div`,{className:Y.optionTop,children:[`+`,b(e.stars),p(`div`,{className:Y.stackedStars,dir:v.isRtl?`ltr`:`rtl`,children:Array.from({length:t}).map(()=>p(g,{className:Y.stackedStar,type:`gold`,size:`big`}))})]}),p(`div`,{className:Y.optionBottom,children:h(v,e.amount,e.currency)}),(o||r&&`winners`in r)&&!!s&&p(`div`,{className:Y.optionBottom,children:p(`div`,{className:Y.perUserStars,children:_(l(`BoostGift.Stars.PerUser`,b(s)))})})]},e.stars)}),!y&&D&&u(w,{className:Y.moreOptions,isText:!0,noForcedUpperCase:!0,onClick:x,children:[l(`Stars.Purchase.ShowMore`),p(f,{className:Y.iconDown,name:`down`})]})]})}),X={content:`j63Xdo6p`,fixedHeight:`E-xx83T0`,withSearch:`sT1YPCzK`,header:`RwB3BKcO`,buttonWrapper:`Z-xvJZEk`},qe=`.${ie.pickerList}`,Je=a(({confirmButtonText:e,isConfirmDisabled:t,shouldAdaptToSearch:n,withFixedHeight:r,onConfirm:i,withPremiumGradient:a,itemsContainerSelector:o=qe,...s})=>{let l=d(),f=!!(e||i),m=c();return se({containerRef:m,selector:`.modal-content ${o}`,isBottomNotch:f,shouldHideTopNotch:!0},[s.isOpen]),u(P,{...s,dialogRef:m,isSlim:!0,className:T(n&&X.withSearch,r&&X.fixedHeight,s.className),contentClassName:T(X.content,s.contentClassName),headerClassName:T(X.header,s.headerClassName),isCondensedHeader:!0,children:[s.children,f&&p(`div`,{className:X.buttonWrapper,children:p(w,{withPremiumGradient:a,onClick:i||s.onClose,color:`primary`,disabled:t,children:e||l(`Confirm`)})})]})}),Z={table:`RMEi5Sgb`,cell:`AEl8NMjg`,title:`IypKoG1m`,value:`ZO-KCUSl`,fullWidth:`_1WIqSuNB`,chatItem:`J6it2-iy`},Ye=a(({tableData:e,className:t,onChatClick:n})=>{let{openChat:r}=S(),i=y(e=>{n?n(e):r({id:e})});if(e?.length)return p(`div`,{className:T(Z.table,t),children:e.map(([e,t])=>u(D,{children:[!!e&&p(`div`,{className:T(Z.cell,Z.title),children:e}),p(`div`,{className:T(Z.cell,Z.value,!e&&Z.fullWidth),children:typeof t==`object`&&`chatId`in t?p(ae,{peerId:t.chatId,className:Z.chatItem,forceShowSelf:!0,withEmojiStatus:t.withEmojiStatus,clickArg:t.chatId,onClick:i}):t})]}))})}),Q={content:`rIjOLQyf`,noFooter:`ssGgYoZw`,avatar:`IdvEatvm`},Xe=a(({isOpen:e,title:t,tableData:n,headerAvatarPeer:r,header:i,modalHeader:a,footer:o,buttonText:s,className:c,contentClassName:l,tableClassName:d,hasBackdrop:f,closeButtonColor:m,moreMenuItems:h,headerRightToolBar:g,onClose:_,onButtonClick:v,withBalanceBar:b,isLowStackPriority:x,currencyInBalanceBar:C})=>{let{openChat:E}=S(),D=y(e=>{E({id:e}),_()});return u(P,{isOpen:e,hasCloseButton:!!t,hasAbsoluteCloseButton:!t,absoluteCloseButtonColor:m||(f?`translucent-white`:void 0),isSlim:!0,header:a,title:t,className:c,contentClassName:T(Q.content,l),moreMenuItems:h,headerRightToolBar:g,onClose:_,withBalanceBar:b,currencyInBalanceBar:C,isLowStackPriority:x,children:[r&&p(M,{peer:r,size:`jumbo`,className:Q.avatar}),i,p(Ye,{tableData:n,className:d,onChatClick:D}),o,s&&p(w,{className:o?void 0:Q.noFooter,onClick:v||_,children:s})]})}),$={root:`FEEwg5rl`,secondary:`_51eeI1vd`,topIcon:`_0fVPMdEi`,premiumGradient:`oEaPoig5`,content:`_7xJ2IMc7`,listItems:`_4Smlf3-h`,listItemTitle:`lPVHA-w3`,separator:`V6iMhrLh`},Ze=a(({className:e,isOpen:t,listItemData:n,headerIconName:r,headerIconPremiumGradient:i,header:a,footer:o,buttonText:s,hasBackdrop:c,absoluteCloseButtonColor:l,withSeparator:d,contentClassName:m,onClose:h,onButtonClick:g})=>u(P,{isOpen:t,className:T($.root,e),contentClassName:T($.content,m),hasAbsoluteCloseButton:!0,absoluteCloseButtonColor:l||(c?`translucent-white`:void 0),onClose:h,children:[r&&p(`div`,{className:T($.topIcon,i&&$.premiumGradient),children:p(f,{name:r})}),a,p(`div`,{className:$.listItems,children:n?.map(([e,t,n])=>u(F,{isStatic:!0,multiline:!0,icon:e,className:$.listItem,children:[p(`span`,{className:T(`title`,$.listItemTitle),children:t}),p(`span`,{className:`subtitle`,children:n})]}))}),d&&p(ce,{className:$.separator}),o,!!s&&p(w,{onClick:g||h,children:s})]})),Qe={root:`JaXKxj2K`,arrow:`_-7ow-ETi`},$e=4*v,et=a(({fromPeer:e,toPeer:t,avatarSize:n=$e})=>u(`div`,{className:Qe.root,children:[p(M,{peer:e,size:n}),p(f,{name:`next`,className:Qe.arrow}),p(M,{peer:t,size:n})]}));export{Je as a,He as c,le as d,Ye as i,Ee as l,Ze as n,Ke as o,Xe as r,We as s,et as t,ue as u};
//# sourceMappingURL=TransferBetweenPeers-BtLTyUGW.js.map