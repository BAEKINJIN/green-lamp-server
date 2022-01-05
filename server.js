const express = require("express");
const cors = require("cors");
const app = express();
const port = 8080;
const models = require('./models');

// json 형식의 데이터를 처리할 수 있게 설정하는 코드
app.use(express.json());
// 브라우저의 CORS이슈를 막기위해 사용하는 코드
app.use(cors());

// get방식 응답 지정
app.get('/products', async(req, res) => {
    // get방식 쿼리 데이터 전송
    const queryString = req.query;
    console.log(queryString);
    console.log(queryString.id);
    console.log(queryString.name);
    res.send({
        "products":[
            {
                "id": 1,
                "name": "거실조명",
                "price": 100000,
                "seller": "그린",
                "imageUrl": "/images/products/product1.jpg"
            },
            {
                "id": 2,
                "name": "주방조명",
                "price": 80000,
                "seller": "그린",
                "imageUrl": "/images/products/product2.jpg"
            },
            {
                "id": 3,
                "name": "포인트조명",
                "price": 120000,
                "seller": "그린",
                "imageUrl": "/images/products/product3.jpg"
            },
            {
                "id": 4,
                "name": "아이방조명",
                "price": 70000,
                "seller": "그린",
                "imageUrl": "/images/products/product4.jpg"
            },
            {
                "id": 5,
                "name": "거실조명",
                "price": 100000,
                "seller": "그린",
                "imageUrl": "/images/products/product1.jpg"
            },
            {
                "id": 6,
                "name": "주방조명",
                "price": 160000,
                "seller": "그린",
                "imageUrl": "/images/products/product2.jpg"
            },
            {
                "id": 7,
                "name": "포인트조명",
                "price": 120000,
                "seller": "그린",
                "imageUrl": "/images/products/product3.jpg"
            },
            {
                "id": 8,
                "name": "아이방조명",
                "price": 70000,
                "seller": "그린",
                "imageUrl": "/images/products/product4.jpg"
            }
        ]
    })
})
// post방식 응답 지정
app.post('/products', async(req, res) => {
    const body = req.body;
    console.log(body);
    res.send('상품이 잘 등록되었습니다.');
})
// GET방식 경로 파라미터 관리하기
app.get('/products/:id', async(req, res) => {
    const params = req.params;
    console.log(params);
    res.send('파라미터 관리하기');
})
// 설정된 app을 실행 시키기
app.listen(port, () => {
    console.log('그린램프 서버가 돌아가고 있습니다.');
    models.sequelize
    .sync()
    .then(() => {
        console.log('DB연결성공');
    })
    .catch(function(err) {
        console.error(err);
        console.log('DB연결에러');
        process.exit();
    })
})