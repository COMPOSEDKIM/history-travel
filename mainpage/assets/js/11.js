let images = [];
let images2 = []; 
let titleTop = [];
let titleBottom = [];
  const tokyoimgTop = ['사진/도쿄/히비야 공원.jpg', '사진/도쿄/이중교.jpg', '사진/도쿄/도쿄 가든 테라스 기오이초.jpg'];
  const tokyoimgBottom = ['사진/도쿄/nakano prison.jpg', '사진/도쿄/Tokutomi Roka Memorial Museum.jpg', '사진/도쿄/Karasuyama Shrine.jpg'];

  const tokyotitleTop = ['히비야 공원', '이중교', '도쿄 가든 테라스 기오이초']
  const tokyotitleBottom = ['nakano prison', 'Tokutomi Roka Memorial Museum', 'Karasuyama Shrine']

  const tokyoTop = ['1919년 2월 8일 도쿄의 유학생들이 독립만세를 외쳤던 히비야 공원(日比谷公園)입니다. 소음악당에 모여 독립만세를 외쳤습니다.',
    '1924년 1월 5일 도쿄에 도착하여 지형을 정찰하고, 오후 7시 거사를 결행코자 황성 정문에 접근하여 폭탄을 투척하고 궁성 쪽으로 달려가 폭탄 두 개를 니주바시(二重橋) 한복판에 던졌으나 불발되고 체포되었습니다.',
    '도쿄 가든 테라스 기오이초 ',
]


  const tokyoBottom = [ '독립운동 협의로 일제에 의해 체포되었던 이강훈ㆍ박 열ㆍ김지섭의 수감되었던 곳입니다. ',
  ' 안중근의사가 중국 여순감옥 수감 중 쓴 휘호 족자에 일본 개화기의 대표적인 작가인 도쿠토미 노카(德富蘆花)라는 일본인이 안 의사에 대한 소회(所懷)를 기록해 둔 유묵이 보관되어 있습니다. 안중근의사의 유묵은 그가 1913년 여순 등 중국 동북부 지역을 여행하던 중 자신의 소설을 즐겨 읽던 히시다 마사모토(菱田正基)라는 당시 여순초등학교 교사로부터 선물로 받은 것입니다. 히시다씨는 당시 여순의 일본 법조계 관계자 사이에 평판이 높았던 안중근의사의 유묵을 소유하고 있다가 도쿠토미 씨에게 선뜻 내놓았습니다. 유묵의 내용은 “가난하되 아첨함이 없으며, 부유하되 교만하지 않다”라는 뜻의 ‘貧而無諂富而無驕’ 8자가 쓰여 있습니다. 안중근의사의 힘찬 필체를 느낄 수 있는 유묵으로 족자 상태로 잘 보존되어 있습니다.',
  '가라스야마 마을 사건당시 조선인들을 습격해 재판을 받았던 가해자들 12명이 무사히 돌아오자 마을 공동체에서 그들의 노고를 달래기 위해 심은 모밀잣밤나무 12그루가 있습니다.',
  ]

  const osakaimgTop = ['사진/오사카/오사카시 중앙공회당3.jpg','사진/오사카/호코쿠 신사.jpg','사진/오사카/front torii.jpg',]
  const osakaimgBottom = ['사진/오사카/오사카 사회운동현창탑3.jpg','사진/오사카/통국사.jpg', '사진/오사카/보당사.jpg']

  const osakatitleTop = ['오사카시 중앙공회당', '호코쿠 신사', 'front torii']
  const osakatitleBottom = ['오사카 사회운동현창탑', '통국사', '보당사']
  const osakaTop = [
    '1918년 건립된 이후 오사카지역 한인들이 민족운동을 하기 위한 집회장소로 사용되었고 지금도 그 모습을 유지하고 있습니다. 재일한인들의 조선인 학살 규탄대회, 노동운동 관련 행사 등을 위한 장소로 사용되었었습니다.',
    '1800년대 지어진 신사로 오사카성 공원 안에 있으며 도요토미 히데요시의 위패가 있습니다.',
    '1920년대는 일제강점기 하에서 한국인들이 다양한 형태로 독립운동을 전개하던 시기였습니다. 일본 내에서도 많은 한국인들이 이주하여 생활하였고, 이들 중 많은 청년들이 독립운동에 참여했습니다.청년 동맹은 독립운동에 필요한 자금을 모금하여 대한민국 임시정부나 독립운동 단체에 지원했습니다. 노동자, 상인, 학생 등 다양한 계층으로부터 자금을 모았으며, 이를 통해 독립운동을 지속할 수 있는 기반을 마련했습니다.']
  const osakaBottom = [
    '오사카 사회운동 현장탑(大阪社会運動現場塔)은 오사카에서 활동한 한국인 독립운동가들을 기리기 위해 세워진 기념비입니다. 이 탑은 오사카에 거주하며 독립운동을 전개한 한인 사회의 노력을 기념하고, 그들의 헌신과 희생을 기억하기 위해 만들어졌습니다. 현장탑은 전통적인 한국의 탑 디자인 요소를 포함하고 있으며, 각종 독립운동 관련 문구와 이름이 새겨져 있습니다. 탑의 각 면에는 독립운동의 중요성을 강조하는 문구와 독립운동가들의 이름이 새겨져 있어 방문객들이 그들의 희생을 되새길 수 있도록 합니다.',
    '조선인 강제노동자 중 무연고자 76위의 영령을 모시고 있는 절입니다. 1960년에 약 200위의 유골을 수습하였고, 같은 해 3월 유골을 인수하면서 66위가 남았습니다. 이후 12위가 더해져 78위가 되었습니다. 1990년 3월 2위의 신원이 확인되면서 한국에 있는 유족의 품으로 돌아가게 되었습니다.',
    '보당사(報堂社)는 일제강점기 동안 독립운동을 지원했던 조직 중 하나입니다. 보당사는 1920년대 후반에 설립된 비밀결사로, 대한민국 임시정부와 연계하여 독립운동을 펼쳤습니다. 이 조직의 주요 활동은 독립운동 자금을 모금하고, 독립운동가들을 지원하며, 항일 투쟁에 참여하는 것이었습니다. 보당사는 특히 청년층과 학생들을 중심으로 활동을 펼쳤으며, 이들의 애국심을 고취시키고 독립운동에 참여하도록 독려했습니다. 이 조직은 독립운동에 필요한 자금을 모으기 위해 다양한 방식으로 기금을 조성했으며, 독립운동을 펼치는 데 필요한 정보를 수집하고 전달하는 역할도 했습니다.'
  ]
  
  const sanfimgTop = ['사진/샌프/골든게이트 교.jpg','사진/샌프/상항한인연합장로교회.jpg','사진/샌프/사이프레스 론 퓨너럴 홈 & 기념공원.jpg'];
  const sanfimgBottom  = ['사진/샌프/페어몬트 샌프란시스코.jpg','사진/샌프/St Mary\'s Square.jpg','사진/샌프/Ferry Building.jpg'];
  const sanftitleTop = ['골든게이트 교', '상항한인연합장로교회', '사이프레스 론 퓨너럴 홈 & 기념공원']
  const sanftitleBottom = ['페어몬트 샌프란시스코', 'St Mary\'s Square', 'Ferry Building']
  const sanfTop = ['금문교가 위치한 샌프란시스코는 20세기 초반 한인 이민자들과 독립운동가들이 많이 활동하던 도시였습니다. 독립운동가들은 이곳에서 자금을 모으고, 일본 제국주의에 맞서기 위한 전략을 세웠습니다. 따라서 금문교는 이 도시의 중요한 랜드마크로서, 한인 독립운동의 역사적 배경을 이해하는 데 도움이 됩니다.',
    '1903년에 안창호, 이대위, 박선겸 들에 의해 만들어진 교회로, 시작 때부터 이 교회 건물은 항일운동과 독립운동을 지원하고 애국지사를 훈련시키는 장소로 쓰였다. 장인환 의사 역시 이 교회의 교인이었으며, 또한 애국가의 작곡가인 안익태는 1930년 이곳 상항교회를 방문하던 중 교포들이 ‘올드 랭 사인’ 멜로디에 애국가를 부르는 것을 보고 새로운 애국가를 작곡하겠다는 결심을 했다. 그야말로 애국가의 태동지인 셈. 이곳에는 샌프란시스코 일대의 역사적인 자료를 한 눈에 볼 수 있는 역사박물관이 있다. 도산 안창호의 당시 미국 비자, ‘대한인 국민회’ 멤버들의 사진들, 안익태의 애국가 악보까지 정성스럽게 정리하고 보관한 것들이 가득하다.',
    '사이프러스 공동묘지에는 이대위(1878.12.28~1928.6.17)와 양주은(1879.5.25~1981.8.30)의 묘가 있고, 이밖에 해방 이후 사망한 많은 한인의 묘지가 있습니다. 이대위는 상항 한인연합감리교회의 목사이자 대한인국민회 북미총회 총회장으로 활동하면서 한인이민자와 유학생을 비롯해 재미한인사회를 이끈 지도자이며, 인터타입 한글식자기를 발명해 《신한민보》에 활자의 혁명을 가져오게 한 인물이었습니다.'
  ]
  const sanfBottom = [    
  '페어몬트 호텔은 대한제국의 외교고문의 직함을 가지고 일제 침략의 앞잡이로 활동하던 친일미국인 스티븐스가 샌프란시스코에 와서 오클랜드의 정거장으로 가기 위해 묶었던 곳입니다. 공립협회와 대동보국회 대표들이 이곳에 머물던 스티븐스를 찾아가 친일행각을 규탄하였던 곳입니다.', 
  ' St Mary\'s Square는 공원이자 도시 광장이며, 2017년 9월 22일 2차대전 중 일본군에 의해 강제로 동원된 성노예 피해자 ‘위안부’를 기리는 기림비가 세워졌습니다. 이 기림비는 미국내 대도시에서는 처음으로 세워진 기림비이며, 다시는 아픈 역사가 되풀이 되지 않고 인권을 수호한다는 목적에서 세워졌습니다.',
  '  배들이 드나들고 멋진 음식점과 상점들이 베이브릿지의 아름다운 풍광과 함께 사람들의 사랑을 받는 페리빌딩. 1908년 3월 23일, 두 명의 청년 장인환, 전명운 의사가 친일파 외교고문을 암살하는 의거를 이곳에서 감행한다. 일본은 대한제국을 강제로 점령한 것이 문제가 없다며 외교 고문인 스티븐스(Stevens)를 앞세워 자신들의 행동을 정당화시켜 줄 것을 원했다. 스티븐스는 샌프란시스코에 도착하자 마자 각종 언론 인터뷰를 통해 일본이 대한제국을 지배하는 것은 매우 합당하다는 망발을 일삼는다. 이에 분노한 한인들은 대표단을 꾸려 발언을 취소하라고 공식 요청을 했지만 묵살 당한다. 다음 날 장인환, 전명운 두 의사의 총알에 스티븐스는 사망하게 된다.'
  ]
  const seoultitleTop = ['백범김구기념관', '이봉창의사동상', '남산골 한옥마을']
  const seoultitleBottom = ['3.1 독립운동기념탑', '만해기념관', '덕수궁 대한문']
  const seoulimgTop = ['사진/서울/백범김구기념관.jpg','사진/서울/이봉창의사동상.jpg','사진/서울/남산골 한옥마을.jpg'];
  const seoulimgBottom = ['사진/서울/3.1 독립운동기념탑.jpg','사진/서울/만해기념관.jpg','사진/서울/덕수궁 대한문.jpg']
  const seoulTop = ['백범 김구 기념관은 대한민국 임시정부 주석을 지낸 김구 선생의 생애와 업적을 기념하기 위해 설립된 기념관입니다. 서울 용산구에 위치해 있으며, 김구 선생의 유품과 독립운동 관련 자료들이 전시되어 있습니다.',
  '이봉창 의사는 1932년 도쿄에서 일왕 히로히토에게 폭탄을 투척한 독립운동가입니다. 그의 동상은 서울 용산구에 위치해 있으며, 그의 용기와 희생을 기리고 있습니다. 1932년 1월 8일 이봉창이 일왕 히로히토의 마차에 폭탄을 투척한 의거를 일으킨 곳입니다.',
  '남산 한옥마을 내에는 독립운동가들이 활동하던 장소들이 일부 재현되어 있습니다. 또한, 남산은 일제강점기 동안 일본군과 독립운동가들 간의 다양한 사건들이 발생했던 곳으로 역사적인 의미가 큽니다.']
  const seoulBottom = ['3.1운동을 기념하기 위해 세워진 기념탑으로, 서울 종로구 탑골공원에 위치해 있습니다. 1919년 3.1운동 당시의 정신과 의미를 기념하며, 독립운동가들의 희생을 기리고 있습니다.',
  '만해 한용운 선생의 생애와 업적을 기리기 위해 설립된 기념관입니다. 강원도 인제군에 위치해 있으며, 그의 시와 독립운동 활동을 기념하는 전시물이 있습니다.',
  '덕수궁은 서울 중구에 위치한 궁궐로, 조선 시대와 대한제국 시기의 중요한 역사적 장소입니다. 고종이 러시아 공사관에서 환궁한 후 이곳에서 황제로 즉위하며 대한제국을 선포했습니다. 이 시기에 경운궁은 덕수궁으로 개칭되었습니다. 고종은 덕수궁에서 대한제국의 근대화를 추진하고 다양한 외교 활동을 펼쳤습니다.']

  const usuriskimgTop = ['사진/우수리스크/Monument to victims of the April events.jpg','사진/우수리스크/신한촌 기념비.jpg'];
  const usuriskimgBottom = ['사진/우수리스크/최재형선생 거주지.jpg','사진/우수리스크/우수리스크 역.jpg'];
  const usurisktitleTop = ['Monument to victims of the April events', '신한촌 기념비' ]
  const usurisktitleBottom = ['최재형선생 거주지', '우수리스크 역']
  const usuriskTop = [
  '1920년 4월 우수리스크 일대에서 일본군에 의해 희생된 러시아인들과 한인 희생자들을 추모하기 위해 세워졌습니다. 그러나 언제 세워졌는지 정확히 알려지지 않습니다. 비문에는 러시아어로 “1920년 4월 4~5일간 악조건을 무릅쓰고 간섭군(연합군)에 의해 빨치산 240명이 희생되었다”고 새겨져 있습니다. 당시 일본군에 의해 희생된 연해주 한인 사회의 지도자인 대한민국임시정부 재무총장 최재형 등의 조난지도 아직 확인되지 않고 있습니다.',
  ' 한인들은 블라디보스토크의 개척리에서 거주하고 있지만 1911년 3월 유행병 방지 등 위생상 이유로 개척리의 한인들을 이주하도록 하였습니다. 이에 개척리 북쪽 언덕으로 이주하여 ‘신한촌’이라고 하였습니다. 신한촌은 블라디보스토크 한인사회의 중심지가 되었습니다. 권업회·권업신문사·한민학교 등이 세워지면서 독립운동 기반도 마련하였습니다. 이 과정에서 러시아 당국과 일제의 감시와 탄압으로 어려움도 많이 겪었고, 1937년 스탈린의 대탄압으로 중앙아시아지역으로 한인들이 강제이주 당하면서 신한촌은 폐허로 변해갔습니다. 1999년 8월 15일 한인들의 역사와 독립운동을 선양하기 위하여 신한촌 하바로프스카야 거리에 기념탑을 건립하였습니다.'
]
  const usuriskBottom = [
    '연해주의 독립운동가 최재형 선생이 일본 헌병대에 의해 목숨을 잃기 전까지 거주하던 곳으로, 현재 그의 생애와 업적에 관한 자료들을 둘러볼 수 있는 기념관으로 사용되고 있다. 최재형 선생은 의병대와 한인 학교 설립, 언론 투쟁, 독립운동 군자금 기부 등 항일 운동에 앞장선 인물로 \'독립운동의 대부(代父)\'라고 불리는 위인이다. 그의 러시아어 별명은 \'페치카(pechka,난로)\'로, 그가 실천한 노블레스 오블리주를 엿볼 수 있는 부분이기도 하다.',
    '고려인과 연해주 독립운동가들의 역사에 관해 둘러볼 수 있는 \'우수리스크\' 지역에 위치한 역으로, 민트색 외관의 건물이 인상적이다. \'블라디보스토크\'와 \'하바롭스크\' 등의 근교 도시로 향하는 노선을 비롯하여 유라시아 대륙을 지나는 \'시베리아 횡단 열차\'도 운행하고 있으며, 보관함, 샤워실 등의 여행자를 위한 편의시설이 마련되어 있어 편리하게 이용이 가능하다.'
  ]

  const shanghaititleTop = ['huangpu park', 'Shanghai Christian Church Moore Memorial Church', 'Jing\'an Park']
  const shanghaititleBottom = ['Shanghai Library', 'Song Qingling Mausoleum', 'Xiwai International School']
  const shanghaiimgTop = ['사진/상하이/huangpu park.jpg','사진/상하이/Shanghai Christian Church Moore Memorial Church.jpg','사진/상하이/Jing\'an Park.jpg'];
  const shanghaiimgBottom = ['사진/상하이/Shanghai Library.jpg','사진/상하이/Song Qingling Mausoleum.jpeg','사진/상하이/Xiwai International School.jpg'];

  const shanghaiTop = ['1922년 의열단의 오성륜과 김익상이 일본 육군대장 다나카를 저격했던 황포탄 의거가 있던 장소입니다.',
  '상하이 최대 규모의 기독교회입니다. 미국 선교사 존 무어의 이름을 차용한 이 곳은 독립운동가 집회장소로 활용되어 1921년 도산 안창호가 이곳에서 연설했습니다.',
  '외국인 묘지로 대한민국 임시 정부 대통령을 지낸 역사학자 박은식과 노백린, 안태국을 비롯한 대한민국 임시 정부 요인들과 안중근의 모친 조성녀 마리아 등이 안장되어 있었다. 그중 박은식, 노백린, 안태국의 묘는 1953년 도시 개발 과정에서 선우혁, 김시문 등의 노력으로 강만 공묘로 이장된 후, 1976년 송칭링 능원 안의 만국공묘로 다시 이장되었다가 한중 국교 수교 이후 1993년 한국으로 이장되었다. 안중근의 모친 조마리아는 1924년 정안사 공묘에서 안장되었으나, 도시 개발이후의 기록이 남아있지 않은데다가, 독립운동가 이장 과정에서 누락되어 현재는 그 무덤을 찾을 길이 없다.',]
  const shanghaiBottom = ['Shanghai Library는 한국 독립운동과 관련된 다양한 자료들이 보관되어 있습니다. 연구자들과 일반인들이 독립운동 역사에 대해 연구할 수 있는 중요한 자원입니다.',
  '쑨원의 부인 송경령의 묘지로, 이곳에는 우리 독립운동가(신규식, 박은식, 노백린, 김인전, 안태국 등) 분들의 묘소도 함께 있습니다. ',
  '상하이 국제학생회관은 독립운동가들이 국제 학생들과 교류하며 독립운동을 논의하던 장소입니다. 이곳에서는 다양한 국제회의와 행사가 열렸습니다. 상하이 자체가 한국 독립운동의 주요 거점 중 하나였으며, 많은 독립운동가들이 이곳에서 활동했습니다. 상하이에는 독립운동과 관련된 여러 유적지와 역사적 장소들이 존재합니다. SISU가 위치한 상하이의 홍커우 지역과 송장 지역은 독립운동가들이 활동했던 장소와 가까운 곳에 있습니다.']
  let city = dokyo
  const selectModal = document.querySelectorAll('.box');

  let textsTop = tokyoTop;
  let textsBottom = tokyoTop;
  const citytitle = document.getElementById('citytitle')

  selectModal.forEach( a => a.addEventListener('click',function (w) { 
    st = w.target.closest('.box');
    city = st.id;
    currentImageIndex = 0;

    if(city === 'dokyo'){
      textsTop = tokyoTop;
      textsBottom = tokyoBottom;
      citytitle.innerText = '도쿄'
      titleTop = tokyotitleTop;
      titleBottom = tokyotitleBottom;
      images = tokyoimgTop;
      images2 = tokyoimgBottom;
    }else if(city === 'osaka'){
      textsTop = osakaTop;
      textsBottom = osakaBottom;
      citytitle.innerText = '오사카'
      images = osakaimgTop;
      images2 = osakaimgBottom;
      titleTop = osakatitleTop;
      titleBottom = osakatitleBottom;
    }else if(city === 'sanf'){
      textsTop = sanfTop;
      textsBottom = sanfBottom;
      citytitle.innerText = '샌프란시스코'
      titleTop = sanftitleTop;
      titleBottom = sanftitleBottom;
      images = sanfimgTop;
      images2 = sanfimgBottom;
    }else if(city === 'seoul'){
      textsTop = seoulTop;
      textsBottom = seoulBottom;
      citytitle.innerText = '서울'
      titleTop = seoultitleTop;
      titleBottom = seoultitleBottom;
      images = seoulimgTop;
      images2 = seoulimgBottom;

    }else if(city === 'shanghai'){
      textsTop = shanghaiTop;
      textsBottom = shanghaiBottom;
      citytitle.innerText = '상하이'
      titleTop = shanghaititleTop;
      titleBottom = shanghaititleBottom;
      images = shanghaiimgTop;
      images2 = shanghaiimgBottom;
    }else{
      textsTop = usuriskTop;
      textsBottom = usuriskBottom;
      citytitle.innerText = '우수리스크'
      titleTop = usurisktitleTop;
      titleBottom = usurisktitleBottom;
      images = usuriskimgTop;
      images2 = usuriskimgBottom;
    }

    }))

  selectModal.forEach( a => a.addEventListener('click',showmodal))
  
  let currentImageIndex  = 0;
  
  // Get the modal
  const modal = document.getElementById("myModal");
  
  // Get the button that opens the modal
  const btn = document.getElementById("dokyo");
  const modalclose = document.getElementById('close')
  
  // Get the images and text in the modal
  const modalImgTop = document.getElementById("modalImgTop");
  const modalImgBottom = document.getElementById("modalImgBottom");
  const modalTextTop = document.getElementById("modalTextTop");
  const modalTextBottom = document.getElementById("modalTextBottom");
  const modaltitle1 = document.getElementById('modal-title1');
  const modaltitle2 = document.getElementById('modal-title2');
  
  // Get the navigation buttons
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  // When the user clicks the button, open the modal 
  function showmodal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Disable scroll
    showContent();
  }
  
  // When the user clicks on <span> (x), close the modal
  modalclose.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Enable scroll
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // Enable scroll
    }
  }
  
  // When the user clicks the next button, show the next image and text
  nextBtn.onclick = function() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showContent();
  }
  
  // When the user clicks the previous button, show the previous image and text
  prevBtn.onclick = function() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showContent();
  }
  
  function showContent() {
    modalImgTop.src = images[currentImageIndex];
    modalImgBottom.src = images2[currentImageIndex];
    modalTextTop.textContent = textsTop[currentImageIndex];
    modalTextBottom.textContent = textsBottom[currentImageIndex];
    modaltitle1.textContent = titleTop[currentImageIndex];
    modaltitle2.textContent = titleBottom[currentImageIndex];
  }
  
const addjapan = document.getElementById('addjapan');
addjapan.addEventListener('click', test);

function test(){
  window.location.href = 'map.html'
}