const API='/api';
export async function request(path, options={}){
 const token=localStorage.getItem('forma_token');
 let res;
 try {res=await fetch(API+path,{...options,headers:{...(options.body?{'Content-Type':'application/json'}:{}),...(token?{Authorization:`Bearer ${token}`} :{}),...options.headers}})}catch{throw new Error('Cannot connect to the server. Start the backend with npm run server.');}
 const data=await res.json().catch(()=>({}));if(!res.ok)throw new Error(data.error||'Something went wrong');return data;
}
