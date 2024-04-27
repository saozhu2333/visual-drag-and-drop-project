type judge = {min:number,max:number}

export default async function runAnimation($el:any, animations = []) {
    const play = (animation:any) => new Promise(resolve => {
        const { animationTime, value = '', isloop } = animation
        $el.style.setProperty('--animate-duration', animationTime + 's')
        $el.classList.add( `animate__${value}`,'animate__animated','animate__bounce', utilsHandle(isloop))
        const removeAnimation = () => {
            $el.removeEventListener('animationend', removeAnimation)
            $el.removeEventListener('animationcancel', removeAnimation)
            $el.classList.remove(`animate__${value}`,'animate__animated','animate__bounce', utilsHandle(isloop))
            $el.style.removeProperty('--animate-duration')
            resolve('')
        }
            
        $el.addEventListener('animationend', removeAnimation)
        $el.addEventListener('animationcancel', removeAnimation)
    })

    for (let i = 0, len = animations.length; i < len; i++) {
        await play(animations[i])
    }
}

function utilsHandle(isloop:any) {
    return isloop ? 'animate__infinite' : 'animate__repeat-1'
}

function runAnimationFun(value:number, judge:judge){
    if (value >= judge.min && value <= judge.max) {
      return true;
    }
    return false;
  };

  export {
    runAnimationFun
  }