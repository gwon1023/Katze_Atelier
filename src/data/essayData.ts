export type EssayStatus = '초안' | '정리 중' | '발행됨';

export type Essay = {
  id: string;
  title: string;
  category: string;
  keywords: string[];
  status: EssayStatus;
  question: string;
  conceptDefinition: string;
  mainArguments: string[];
  exampleWorks: string[];
  counterLimits: string;
  nextQuestions: string[];
};

export const essayData: Essay[] = [
  {
    id: 'quiet-surreality',
    title: '조용한 몽환성은 어디에서 오는가',
    category: '몽환성 연구',
    keywords: ['침묵', '간격', '사물'],
    status: '정리 중',
    question: '초현실적 사건 없이도 작품은 어떻게 꿈의 감각을 획득하는가?',
    conceptDefinition:
      '조용한 몽환성은 비현실적 이미지의 강도가 아니라 현실적 요소 사이의 연결이 느슨해지는 순간에 발생하는 정서적 상태다.',
    mainArguments: [
      '사건의 원인을 생략하면 독자는 서사의 빈칸을 감각으로 채운다.',
      '반복되는 사물은 설명보다 오래 남아 작품 내부의 작은 의식을 만든다.',
      '느린 리듬은 감정을 명명하지 않고 체류하게 만드는 장치다.',
    ],
    exampleWorks: ['푸른 방의 낮은 숨', '유리 정원 관찰기', '종이 궤도의 독백'],
    counterLimits:
      '모호함이 항상 깊이를 만들지는 않는다. 빈칸이 감각적 필연성 없이 남겨질 때 독자는 해석의 초대가 아니라 정보 부족으로 받아들일 수 있다.',
    nextQuestions: [
      '몽환성과 난해함의 경계는 어디에서 갈리는가?',
      '독자의 체류 시간을 설계하는 문장 리듬은 무엇인가?',
    ],
  },
  {
    id: 'ai-as-reader',
    title: 'AI 독자는 비평의 동료가 될 수 있는가',
    category: 'AI 비평',
    keywords: ['프롬프트', '해석 편향', '기록'],
    status: '초안',
    question: 'AI 분석은 창작자의 비평 노트를 확장하는가, 아니면 평균적 해석으로 납작하게 만드는가?',
    conceptDefinition:
      'AI 독자는 작품을 감상하는 주체라기보다 입력된 관점에 따라 해석 후보를 압축하고 배열하는 기록 보조자에 가깝다.',
    mainArguments: [
      'AI는 반복, 대비, 장르 관습처럼 명시적 패턴을 빠르게 포착한다.',
      '몸의 감각, 시간의 체류, 침묵의 압력처럼 경험적 요소는 별도 프롬프트가 필요하다.',
      '좋은 AI 분석 기록은 최종 해석보다 질문의 변화를 남긴다.',
    ],
    exampleWorks: ['따뜻한 잡음의 기록', '유리 정원 관찰기'],
    counterLimits:
      'AI 결과는 그럴듯한 문장으로 불확실성을 가릴 수 있다. 따라서 창작자는 결과를 인용하기보다 자신의 감상과 어긋나는 지점을 표시해야 한다.',
    nextQuestions: [
      'AI가 놓친 감각을 기록하는 별도 양식은 어떻게 만들 수 있을까?',
      '작품별 분석 프롬프트를 축적하면 개인 비평 언어도 선명해질까?',
    ],
  },
  {
    id: 'object-before-plot',
    title: '서사보다 먼저 놓이는 사물',
    category: '창작 방법론',
    keywords: ['소품', '상징', '배치'],
    status: '발행됨',
    question: '사물은 언제 단순한 배경을 넘어 서사의 엔진이 되는가?',
    conceptDefinition:
      '서사적 사물은 인물의 욕망, 부재, 반복 습관을 물질적 형태로 붙잡아 장면 사이를 연결하는 장치다.',
    mainArguments: [
      '사물은 대사를 줄이면서 감정의 방향을 예고한다.',
      '같은 사물의 위치가 바뀌면 인물의 심리 변화가 간접적으로 드러난다.',
      '상징은 의미를 하나로 고정할 때보다 사용 흔적을 품을 때 오래 살아남는다.',
    ],
    exampleWorks: ['푸른 방의 낮은 숨', '종이 궤도의 독백'],
    counterLimits:
      '사물에 의미를 과하게 부여하면 장면이 도식적으로 보일 수 있다. 기능과 상징이 동시에 작동하도록 생활감이 필요하다.',
    nextQuestions: [
      '반복 사물의 등장 간격은 어떻게 설계하는가?',
      '웹 기반 실험작에서 클릭 가능한 사물은 어떤 서사적 역할을 할 수 있는가?',
    ],
  },
];
