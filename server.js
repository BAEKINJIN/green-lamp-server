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
    // 데이터베이스 조회하기
    // findAll 전체항목조회 / findOne 하나만 조회
    // 조건 지정 할 수 있음
    // limit로 항목갯수지정
    // order 정렬변경
    // attributes 원하는 컬럼만 선택
    models.Product.findAll({
        limit: 8,
        order: [
            ["createdAt", "DESC"]
        ],
        attributes: [
            "id",
            "name",
            "price",
            "seller",
            "createdAt",
            "imageUrl"
        ]
    })
    .then((result) => {
        res.send({
            product: result
        })
    })
    .catch((error) => {
        console.error(error);
        res.send('데이터를 가져오지 못했습니다.');
    })
})
// post방식 응답 지정
app.post('/products', async(req, res) => {
    const body = req.body;
    const { name, description, price, seller } = body;
    // Product 테이블에 데이터를 삽입
    // 구문 > models.테이블이름.create
    models.Product.create({
        name: name,
        description: description,
        price: price,
        seller: seller
    }).then((result) => {
        console.log("상품 생성 결과 : ", result);
        res.send({
            result,
        })
    })
    .catch((error) => {
        console.error(error);
        res.send("상품 업로드에 문제가 발생했습니다.");
    })
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