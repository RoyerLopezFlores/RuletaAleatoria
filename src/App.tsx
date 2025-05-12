

import { useEffect, useState } from 'react'
import './App.css'
import {createSpinnerRandom} from "roam-custom-elements";
function App() {
  const [manager, setManager] = useState<any>(null);
  const [text,setText] = useState<string>("");
  const [itemSelected, setItemSelected] = useState<number|null>(null);
  const [itemsChoice, setItemsChoice] = useState<string[]>(["Random1", "Random2", "Random3"]);
  const [historial, setHistorial] = useState<string>("");
  const createManager = async(elements?: string[], start?:boolean)=>{
    if(elements?.length === 0){
      return;
    }
    const baseManager =  await createSpinnerRandom({
      id_container:"ruleta-container",
      id_canvas:"ruleta",
      elementsRandom: elements || ["Random1", "Random2", "Random3"],
      initialTime: Math.floor(Math.random() * 2000),
      onStop: (item)=>{
        setItemSelected(item);
        console.log("Hola",item);
      }
    });
    baseManager?.draw();
    if(start){
      baseManager?.start();
    }
    setManager(baseManager);
  }
  useEffect(()=>{
    createManager();
    
  }, [])
  const handleClickStart = () => {
    manager?.start();
  }
  const handleClickCreate = async () => {
    await createManager(itemsChoice, true);
    

  }
  const handleOnTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textValue = event.target.value;
    setText(textValue); 
    const lines = textValue.split('\n');
    const linesFilter =lines.filter((line) => line.trim() !== '')
    console.log(linesFilter);
    createManager(linesFilter);
    setItemsChoice(linesFilter);
    setItemSelected(null);
  }
  const handleDeleteSelected = () =>{
    if(itemSelected!==null){
      if(historial=== ""){
        setHistorial(itemsChoice[itemSelected]);
      }else{
        setHistorial(historial + `\n${itemsChoice[itemSelected]}`);
      }
    }
    const filterLines = itemsChoice.filter((_, i) => i !== itemSelected);
    setItemsChoice(filterLines);
    setText(filterLines.join('\n'));
    createManager(filterLines);
    
    setItemSelected(null);
  }
  const handleCleanHistorial = () =>{
    setHistorial("");
  }
  return (
    <>
      <div className='app-container'>
        <div>

        </div>
        <div>
          <h1>Ruleta Aleatoria</h1>
        </div>
        <div className='center-content'>
          <div className='content-ruleta'>
            <div id="ruleta-container">
              <canvas id="ruleta"></canvas>
            </div>
          </div>
          <div className='container-items'>
            <div className=''>
              {itemSelected!==null && (
                <div className='item-selected'>
                  <h3>Elemento seleccionado:</h3>
                  <p>{itemsChoice[itemSelected]}</p>
                </div>
              )}
            </div>
            <div className="buttons">
            
            {itemSelected!==null? 
              <>
              <button className="button" onClick={handleClickCreate}>Otra vez</button>
              <button className="button" onClick={handleDeleteSelected}>Eliminar seleccionado</button>
              </>:
              <button className="button" 
            onClick={handleClickStart}
            disabled={!(itemsChoice.length > 1)}
            >Start</button>}
              
            </div>
              <div className="textarea-container">
              <label htmlFor="textarea1" className="label">Items a escojer:</label>
              <textarea id="textarea1"
               className="textarea" placeholder="Escribe aquí..."
               value={text}
               onChange={handleOnTextChange}
               ></textarea>
            </div>
            <div className="textarea-container">
              <label htmlFor="textarea2" className="label">Historial</label>
              <textarea id="textarea2" 
              value = {historial}
              readOnly
              className="textarea" placeholder="Escribe más aquí..."></textarea>
              
            </div>
            <div className="buttons">
              {historial!=="" && (
                <button className="button" onClick={handleCleanHistorial}>Limpiar historial</button>
              )}
              </div>
          </div>
          
        </div>
        
      </div>
    </>
  )
}

export default App
