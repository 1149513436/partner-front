import { faker } from '@faker-js/faker';

export default function(){
    if(localStorage.getItem("fakerList")){
        console.log("true6666");
        return localStorage.getItem("fakerList")
    }else{
        let arr=[];
        for(let i=0;i<1000;i++){
            let obj={
                id:i,
                img:faker.image.imageUrl(204, 234, '', true),
                content:faker.lorem.paragraphs()
            }
            arr.push(obj)
    
        }
        localStorage.setItem("fakerList",JSON.stringify(arr));
        console.log("arr",arr);
        return arr;
    }
    
}