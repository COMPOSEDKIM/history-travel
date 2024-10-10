// app.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const multer = require('multer');


const postsFilePath = path.join(__dirname, 'views', 'posts.json');
const app = express();
const port = 3000;
// const ipAddress = '220.95.63.21'
// app.listen(port, ipAddress , () => {
//   console.log(`Server is running on port ${port}`);
// });

const uploadDir = path.join(__dirname, 'uploads');
const upload = multer({ dest: uploadDir });

let savedMarkers = [];

// 클라이언트에서 POST 요청이 오면 데이터를 저장
app.post('/save-marker', (req, res) => {
  const markerData = req.body;
  savedMarkers.push(markerData);
  saveMarkersToFile();
  res.json({ message: 'Marker saved successfully!' });
});

// 저장된 마커들을 클라이언트에 전송
app.get('/get-markers', (req, res) => {
  res.json(savedMarkers);
});

function saveMarkersToFile() {
  fs.writeFileSync('markers.json', JSON.stringify(savedMarkers), 'utf-8');
}

// 서버 시작 시 posts.json 파일이 없으면 빈 배열을 생성
(async () => {
  try {
    await fs.access(postsFilePath); // 파일이 존재하는지 확인
  } catch (error) {
    if (error.code === 'ENOENT') {
      // 파일이 없으면 빈 배열 생성
      await fs.writeFile(postsFilePath, '[]', 'utf-8');
    } else {
      console.error(error);
    }
  }
})();


// 해당 미들웨어를 추가하여 'x-content-type-options' 헤더를 설정
app.use((req, res, next) => {
  res.setHeader('x-content-type-options', 'nosniff');
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // 추가: JSON 형식의 요청 파싱
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));//

app.get('/', async (req, res) => {
  try {
    // 기존 index.ejs에 저장된 게시물 목록을 보여줌
    const posts = await loadPosts();
    res.render('index', { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/new', (req, res) => {
  // 새로운 게시물을 작성하는 페이지인 new.ejs를 보여줌
  res.render('new');
});

// 이미지 업로드를 위한 라우트 추가
app.post('/new', upload.single('image'), async (req, res) => {
  try {
    const { title, author, test1, placename1, content} = req.body; //, markerlist, wayps 
    const imagePath = req.file ? req.file.path : null;
    // const post = { title, author,data: {test1, placename1, markerlist, wayps} };
    
    const post = { title, author, test1, placename1, content, imagePath};
    // console.log('Received data:', { title, author, test1, placename, markerlist, wayps });
    await savePost(post);

    // 응답으로 JSON 형식의 데이터를 보냄
    res.json({ success: true, message: 'Post saved successfully' });
  } catch (error) {
    console.error('Error creating new post:', error);
    // 에러 시에도 JSON 형식의 데이터를 보냄
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/osaka', (req, res) => {
  // 새로운 게시물을 작성하는 페이지인 new.ejs를 보여줌
  res.render('osaka');
});

// 이미지 업로드를 위한 라우트 추가
app.post('/osaka', upload.single('image'), async (req, res) => {
  try {
    const { title, author, test1, placename1, content} = req.body; //, markerlist, wayps 
    const imagePath = req.file ? req.file.path : null;
    // const post = { title, author,data: {test1, placename1, markerlist, wayps} };
    
    const post = { title, author, test1, placename1, content, imagePath};
    // console.log('Received data:', { title, author, test1, placename, markerlist, wayps });
    await savePost(post);

    // 응답으로 JSON 형식의 데이터를 보냄
    res.json({ success: true, message: 'Post saved successfully' });
  } catch (error) {
    console.error('Error creating osaka post:', error);
    // 에러 시에도 JSON 형식의 데이터를 보냄
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/sanf', (req, res) => {
  // 새로운 게시물을 작성하는 페이지인 new.ejs를 보여줌
  res.render('sanf');
});

// 이미지 업로드를 위한 라우트 추가
app.post('/sanf', upload.single('image'), async (req, res) => {
  try {
    const { title, author, test1, placename1, content} = req.body; //, markerlist, wayps 
    const imagePath = req.file ? req.file.path : null;
    // const post = { title, author,data: {test1, placename1, markerlist, wayps} };
    
    const post = { title, author, test1, placename1, content, imagePath};
    // console.log('Received data:', { title, author, test1, placename, markerlist, wayps });
    await savePost(post);

    // 응답으로 JSON 형식의 데이터를 보냄
    res.json({ success: true, message: 'Post saved successfully' });
  } catch (error) {
    console.error('Error creating sanf post:', error);
    // 에러 시에도 JSON 형식의 데이터를 보냄
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/shanghai', (req, res) => {
  // 새로운 게시물을 작성하는 페이지인 new.ejs를 보여줌
  res.render('shanghai');
});

// 이미지 업로드를 위한 라우트 추가
app.post('/shanghai', upload.single('image'), async (req, res) => {
  try {
    const { title, author, test1, placename1, content} = req.body; //, markerlist, wayps 
    const imagePath = req.file ? req.file.path : null;
    // const post = { title, author,data: {test1, placename1, markerlist, wayps} };
    
    const post = { title, author, test1, placename1, content, imagePath};
    // console.log('Received data:', { title, author, test1, placename, markerlist, wayps });
    await savePost(post);

    // 응답으로 JSON 형식의 데이터를 보냄
    res.json({ success: true, message: 'Post saved successfully' });
  } catch (error) {
    console.error('Error creating shanghai post:', error);
    // 에러 시에도 JSON 형식의 데이터를 보냄
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/tokyo', (req, res) => {
  // 새로운 게시물을 작성하는 페이지인 new.ejs를 보여줌
  res.render('tokyo');
});

// 이미지 업로드를 위한 라우트 추가
app.post('/tokyo', upload.single('image'), async (req, res) => {
  try {
    const { title, author, test1, placename1, content} = req.body; //, markerlist, wayps 
    const imagePath = req.file ? req.file.path : null;
    // const post = { title, author,data: {test1, placename1, markerlist, wayps} };
    
    const post = { title, author, test1, placename1, content, imagePath};
    // console.log('Received data:', { title, author, test1, placename, markerlist, wayps });
    await savePost(post);

    // 응답으로 JSON 형식의 데이터를 보냄
    res.json({ success: true, message: 'Post saved successfully' });
  } catch (error) {
    console.error('Error creating tokyo post:', error);
    // 에러 시에도 JSON 형식의 데이터를 보냄
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/seoul', (req, res) => {
  // 새로운 게시물을 작성하는 페이지인 new.ejs를 보여줌
  res.render('seoul');
});

// 이미지 업로드를 위한 라우트 추가
app.post('/seoul', upload.single('image'), async (req, res) => {
  try {
    const { title, author, test1, placename1, content} = req.body; //, markerlist, wayps 
    const imagePath = req.file ? req.file.path : null;
    // const post = { title, author,data: {test1, placename1, markerlist, wayps} };
    
    const post = { title, author, test1, placename1, content, imagePath};
    // console.log('Received data:', { title, author, test1, placename, markerlist, wayps });
    await savePost(post);

    // 응답으로 JSON 형식의 데이터를 보냄
    res.json({ success: true, message: 'Post saved successfully' });
  } catch (error) {
    console.error('Error creating seoul post:', error);
    // 에러 시에도 JSON 형식의 데이터를 보냄
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/risk', (req, res) => {
  // 새로운 게시물을 작성하는 페이지인 new.ejs를 보여줌
  res.render('risk');
});

// 이미지 업로드를 위한 라우트 추가
app.post('/risk', upload.single('image'), async (req, res) => {
  try {
    const { title, author, test1, placename1, content} = req.body; //, markerlist, wayps 
    const imagePath = req.file ? req.file.path : null;
    // const post = { title, author,data: {test1, placename1, markerlist, wayps} };
    
    const post = { title, author, test1, placename1, content, imagePath};
    // console.log('Received data:', { title, author, test1, placename, markerlist, wayps });
    await savePost(post);

    // 응답으로 JSON 형식의 데이터를 보냄
    res.json({ success: true, message: 'Post saved successfully' });
  } catch (error) {
    console.error('Error creating risk post:', error);
    // 에러 시에도 JSON 형식의 데이터를 보냄
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/post/mapsave.js', (req, res) => {
  res.header('Content-Type', 'application/javascript');
  res.sendFile(path.join(__dirname, 'path-to-your-mapsave.js-file'));
});


app.get('/post', (req, res) => {
  res.render('post'); // 이 부분은 실제로는 여러 라우트에 맞게 설정되어야 합니다.
});

app.get('/post/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await loadPostById(id);
    
    if (post.imagePath) {
      post.imagePath = path.basename(post.imagePath);
    }
    res.render('post', { post });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

async function loadPosts() {
  const data = await fs.readFile(postsFilePath, 'utf8');
  return JSON.parse(data);
}

async function savePost(post) {
  const posts = await loadPosts();
  posts.push(post);
  await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
}

async function loadPostById(id) {
  const posts = await loadPosts();
  return posts[id];
}

// 서버 시작 전 필요한 비동기 작업 완료
(async () => {
  try {
    await fs.access(postsFilePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.writeFile(postsFilePath, '[]', 'utf-8');
    } else {
      console.error(error);
    }
  }

//   app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
//   });
// })();

  // 서버 시작
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
})();

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);

// });

// async function loadPosts() {
//   const data = await fs.readFile(postsFilePath, 'utf8');
//   return JSON.parse(data);
// }

// async function savePost(post) {
//   const posts = await loadPosts();
//   posts.push(post);
//   await fs.writeFile(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
// }

// async function loadPostById(id) {
//   const posts = await loadPosts();
//   return posts[id];
// }