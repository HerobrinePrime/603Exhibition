import {keyboard} from 'lingo3d-vue'
import {Ref} from 'vue'

let speed = 5

export default (dummyRef:Ref)=>{
    keyboard.onKeyPress = (_, keys) => {
          // console.log(keys);

          const dummy = dummyRef.value;
          if (!dummy) return;
        
          if (keys.has("w")) dummy.strideForward = -speed;
          else if (keys.has("s")) dummy.strideForward = speed;
          else dummy.strideForward = 0;
        
          if (keys.has("a")) dummy.strideRight = speed;
          else if (keys.has("d")) dummy.strideRight = -speed;
          else dummy.strideRight = 0;
        };
}