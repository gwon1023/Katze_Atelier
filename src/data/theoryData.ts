export type TheoryTerm = {
  index: string;
  name: string;
  definition: string;
  signal: string;
};

export type DreamType = {
  code: string;
  name: string;
  description: string;
  method: string;
};

export type AnalysisModel = {
  phase: string;
  title: string;
  question: string;
};

export const theoryTerms: TheoryTerm[] = [
  {
    index: 'A01',
    name: '몽환성',
    definition: '현실적 요소의 연결이 느슨해지며 독자가 감각으로 빈칸을 채우게 되는 미학적 상태.',
    signal: '인과의 지연, 반복 사물, 낮은 설명 밀도',
  },
  {
    index: 'A02',
    name: '정적 압력',
    definition: '사건보다 공기, 조명, 침묵의 밀도가 장면을 먼저 이끄는 방식.',
    signal: '긴 호흡의 컷, 제한된 대사, 낮은 움직임',
  },
  {
    index: 'A03',
    name: '감각적 누락',
    definition: '필요한 정보가 빠진 자리에 촉각, 청각, 시각 단서가 대신 서사를 구성하는 현상.',
    signal: '말해지지 않은 원인, 부분적으로만 제시되는 이미지',
  },
  {
    index: 'A04',
    name: 'AI 독법',
    definition: '작품의 반복 패턴과 해석 후보를 압축해 창작자가 다시 질문하도록 돕는 분석 절차.',
    signal: '프롬프트 관점, 해석 편향 표시, 창작 적용 메모',
  },
];

export const dreamTypes: DreamType[] = [
  {
    code: 'T1',
    name: '정적 몽환',
    description: '침묵과 낮은 움직임이 현실감을 느리게 밀어내는 유형.',
    method: '장면의 원인을 생략하고 사물의 위치 변화를 반복 기록한다.',
  },
  {
    code: 'T2',
    name: '반사적 몽환',
    description: '거울, 유리, 화면 같은 표면이 관찰자와 대상을 뒤섞는 유형.',
    method: '시점, 반사면, 관람 동선을 함께 기록한다.',
  },
  {
    code: 'T3',
    name: '서간적 몽환',
    description: '편지, 메모, 도표처럼 사적인 기록물이 세계의 스케일을 접는 유형.',
    method: '개인 문장과 추상 도식을 병치한다.',
  },
  {
    code: 'T4',
    name: '청각적 몽환',
    description: '잡음, 잔향, 반복음이 기억의 질감을 생성하는 유형.',
    method: '해석 전에 청각적 인상과 밀도 변화를 분리해 적는다.',
  },
];

export const analysisModels: AnalysisModel[] = [
  {
    phase: '01',
    title: 'Surface Scan',
    question: '처음 남는 이미지, 소리, 사물은 무엇인가?',
  },
  {
    phase: '02',
    title: 'Structure Map',
    question: '장면, 문단, 동선은 어떤 간격으로 반복되는가?',
  },
  {
    phase: '03',
    title: 'Dream Index',
    question: '몽환성은 인과, 감각, 상징 중 어디에서 발생하는가?',
  },
  {
    phase: '04',
    title: 'Craft Transfer',
    question: '이 분석을 다음 창작 규칙으로 어떻게 바꿀 수 있는가?',
  },
];
