import client from "../client"

export default {
    Mutation:{
        createAccount: async (
            _, //root argument 무시
            {firstName, astName, username, email,password,} //user에게 줄 데이터
        ) => {
            //username, email이 DB에 있는지 확인
            const existingUser = await client.user.findFirst({//find first user 필터 작성
                where:{
                    OR: [// 조건들이 있는 배열 필요
                        {   
                            //조건1) argument의 username과 같음 -> username:username에서 생략 작성
                            // argument username과 같은 username 데이터 찾기
                            username, 
                        },
                        {
                            // argument email과 같은 email 데이터 찾기
                            email,
                        },
                    ]
                },
            }); 
            //존재하는 user가 있다면 existingUser가 user가 될 것임
            console.log(existingUser);
            //없다면 hash password 
            //내용 save, user return
        },
        
    },
};