jQuery.extend(jQuery.easing,{def:"easeOutQuint",swing:function(e,a,c,b,d){return jQuery.easing[jQuery.easing.def](e,a,c,b,d)},easeInQuad:function(e,a,c,b,d){return b*(a/=d)*a+c},easeOutQuad:function(e,a,c,b,d){return-b*(a/=d)*(a-2)+c},easeInOutQuad:function(e,a,c,b,d){if((a/=d/2)<1)return b/2*a*a+c;return-b/2*(--a*(a-2)-1)+c},easeInQuint:function(e,a,c,b,d){return b*(a/=d)*a*a*a*a+c},easeOutQuint:function(e,a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c},easeInOutQuint:function(e,a,c,b,d){if((a/=d/2)< 1)return b/2*a*a*a*a*a+c;return b/2*((a-=2)*a*a*a*a+2)+c},easeInBack:function(e,a,c,b,d,f){f==void 0&&(f=1.70158);return b*(a/=d)*a*((f+1)*a-f)+c},easeOutBack:function(e,a,c,b,d,f){f==void 0&&(f=1.70158);return b*((a=a/d-1)*a*((f+1)*a+f)+1)+c},easeInOutBack:function(e,a,c,b,d,f){f==void 0&&(f=1.70158);if((a/=d/2)<1)return b/2*a*a*(((f*=1.525)+1)*a-f)+c;return b/2*((a-=2)*a*(((f*=1.525)+1)*a+f)+2)+c},easeInBounce:function(e,a,c,b,d){return b-jQuery.easing.easeOutBounce(e,d-a,0,b,d)+c},easeOutBounce:function(e, a,c,b,d){return(a/=d)<1/2.75?b*7.5625*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+0.75)+c:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+0.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+0.984375)+c},easeInOutBounce:function(e,a,c,b,d){if(a<d/2)return jQuery.easing.easeInBounce(e,a*2,0,b,d)*0.5+c;return jQuery.easing.easeOutBounce(e,a*2-d,0,b,d)*0.5+b*0.5+c}}); jQuery.extend(jQuery.easing,{easeIn:function(e,a,c,b,d){return jQuery.easing.easeInQuad(e,a,c,b,d)},easeOut:function(e,a,c,b,d){return jQuery.easing.easeOutQuad(e,a,c,b,d)},easeInOut:function(e,a,c,b,d){return jQuery.easing.easeInOutQuad(e,a,c,b,d)},bouncein:function(e,a,c,b,d){return jQuery.easing.easeInBounce(e,a,c,b,d)},bounceout:function(e,a,c,b,d){return jQuery.easing.easeOutBounce(e,a,c,b,d)},bounceinout:function(e,a,c,b,d){return jQuery.easing.easeInOutBounce(e,a,c,b,d)},backin:function(e, a,c,b,d){return jQuery.easing.easeInBack(e,a,c,b,d)},backout:function(e,a,c,b,d){return jQuery.easing.easeOutBack(e,a,c,b,d)},backinout:function(e,a,c,b,d){return jQuery.easing.easeInOutBack(e,a,c,b,d)}});