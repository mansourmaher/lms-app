import { on } from 'events';
import { Confetti } from './../node_modules/react-confetti/src/Confetti';
import {create} from 'zustand';

type ConfettiStore = {
    isOpen: boolean;
    onOpen:()=> void;
    onClose:()=> void;
    };


    export const useConfettiStore = create<ConfettiStore>((set)=>({
        isOpen:false,
        onOpen:()=> set({isOpen:true}),
        onClose:()=> set({isOpen:false}),
    }));
