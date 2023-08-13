import { faker } from '@faker-js/faker';

export default function(){
    if(localStorage.getItem("fakerList")){
        // console.log("true6666");
        return localStorage.getItem("fakerList")
    }else{
        let arr=[];
        for(let i=0;i<1000;i++){
            
            
            let obj={
                id:i,
                // img:`https://dummyimage.com/${i}`,
                img:`https://picsum.photos/seed/picsum/200/300?random=${i+1}`,
                content:faker.lorem.paragraphs()
            }
            arr.push(obj)
    
        }
        localStorage.setItem("fakerList",JSON.stringify(arr));
        // console.log("arr",arr);
        return arr;
    }
    
}