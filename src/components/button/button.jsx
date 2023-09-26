import css from "./button.module.css"

const Button = ({loadMorePages}) => {


   
        return (

            <button type="button" className={css.button} onClick={loadMorePages}>Load More</button>
        )


     }

     export default Button;

