import { faker } from '@faker-js/faker';

export default function(){
    let arr=[];
    for(let i=0;i<10000;i++){
        let obj={
            id:i,
            img:faker.image.imageUrl(204, 234, '', true),
            content:faker.lorem.paragraphs()
        }
        arr.push(obj)
    }
    console.log("arr",arr);
    return arr;
}