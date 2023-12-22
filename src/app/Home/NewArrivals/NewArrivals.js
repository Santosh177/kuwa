import ProductSlider from './ProductSlider/ProductSlider';
import './new-arrivals.module.scss'


const NewArrivals = ({data}) => {
    console.log("cnjbaj",data)
    const newArrivals = {
        product : data,
        headerTitle:"New Arrivals"
      }
      if(data && data.length > 0){

  return (
    
         <div>
            <ProductSlider data={newArrivals}/>
         </div>
    )
  }else{
    return null;
  }
}

export default NewArrivals