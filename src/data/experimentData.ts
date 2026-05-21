export type Experiment = {
  id: string;
  title: string;
  kind: string;
  status: string;
  summary: string;
  note: string;
};

export const experimentData: Experiment[] = [
  {
    id: 'clicking-margins',
    title: '여백을 클릭하는 문장',
    kind: '클릭형 텍스트',
    status: '프로토타입',
    summary: '문장의 여백을 누르면 숨겨진 주석과 다른 시점의 문장이 펼쳐진다.',
    note: '읽는 순서가 독자의 손끝에서 바뀌는 짧은 산문 실험.',
  },
  {
    id: 'slow-image-reading',
    title: '느린 이미지 감상대',
    kind: '이미지 감상 실험',
    status: '스케치',
    summary: '이미지를 한 번에 보여주지 않고 색, 윤곽, 상징 단서 순서로 천천히 공개한다.',
    note: '첫인상과 재해석의 시간차를 기록하기 위한 감상 장치.',
  },
  {
    id: 'archive-dials',
    title: '비평 아카이브 다이얼',
    kind: 'UI 실험',
    status: '구상',
    summary: '분위기, 매체, 상징 밀도 다이얼로 비평 노트를 탐색하는 인터페이스.',
    note: '목록형 아카이브를 감각적 분류 체계로 바꾸는 실험.',
  },
];
