import React, { useState } from "react";
import "./FormStyles.css";
import axios from "axios";
let search = 'random'
function Form(){
    const [books, setBooks] = useState({
        data: [],
        loading: true,
    });

    const [searchBook, setBookname] = useState('')
    
    const fetchInfo = async() => {
        if(searchBook){
            axios.defaults.headers.common = {
                "X-API-Key": "RandomPassword",
              };
            await axios.get(`http://localhost:8080/book/${searchBook}`, {
                headers: {"X-API-Key": "RandomPassword"},
                params: {}
            })
          .then((res)=> setBooks({
            data: res.data,
            loading: false,
          }))
          .catch(search = searchBook)
          
        }
         
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // alert(`The name you entered was: ${searchBook}`)
      }
      
    if(books.data.length === 0){
        
        return(
            <div className="form">
                        <form onSubmit={handleSubmit}>
                            <label>Enter Title
                            </label>
                            <input type="text" value={searchBook} onChange={(e)=> setBookname(e.target.value)} required>
                            </input>
                            <button className="button1" onClick={fetchInfo}>Submit</button>
                            
                        </form>
                        <div>
                            <t>
                                <center>
                                    "{search}" does not exist in our database
                                </center>
                                
                            </t>
                        </div>
                            
                        
                    </div>
        )
    }else{
        
        return(
            <div className="form">
                        <form onSubmit={handleSubmit}>
                            <label>Enter Title
                            </label>
                            <input type="text" value={searchBook} onChange={(e)=> setBookname(e.target.value)} required>
                            </input>
                            <button className="button1" onClick={fetchInfo}>Submit</button>
                            
                        </form>
                        <div className="table">
                           
                            <table className="table1">
                                <caption>
                                    Our collection
                                </caption>
                                <thead className="table header">
                                    <tr>
                                        <th scope="col">
                                            Title
                                        </th>
                                        <th scope="col">
                                            ISBN
                                        </th>
                                        <th scope="col">
                                            Description
                                        </th>
                                        <th scope="col">
                                            Suggestion 
                                        </th>
                                        
                                    </tr>
                                    {
                                        books.data.map((book)=>(
                                            <tr>
                                                <th scope="col">
                                                    {books.loading?'':
                                                        book.title}
                                                </th>
                                                <th scope="col">
                                                    {books.loading?'':
                                                        book.isbn}
                                                </th>
                                                <th scope="col">
                                                    {books.loading?'':
                                                        book.description}
                                                </th>
                                                <th scope="col">
                                                    {
                                                        books.loading?'':
                                                        book.bookSuggestion[1]                                             
                                                    }
                                                     ,
                                                    {
                                                        books.loading?'':
                                                        book.bookSuggestion[0]                                                   
                                                    }
                                                </th>
                                            </tr>
                                        ))
                                    }
                                    

                                </thead>
                            </table>
                            
                        </div>
                            
                        
                </div>
    ); 
    }
            
}
        
export default Form;