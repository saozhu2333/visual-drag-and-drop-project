import React from "react";
import component from "./component"
import { action, makeObservable, observable } from "mobx";
class indexStore {
    componentStore
    constructor(){
        makeObservable(this)
        this.componentStore = new component();
    }
}

const store = new indexStore()
const context = React.createContext(store)

const useStore = () => React.useContext(context)
export default  useStore