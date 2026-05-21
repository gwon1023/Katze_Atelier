export type EffectEntry = {
  name: string;
  library: string;
  difficulty: 'Low' | 'Medium' | 'High';
  performanceCost: 'Low' | 'Medium' | 'High';
  dreamType: string;
  useCase: string;
};

export const effectData: EffectEntry[] = [
  {
    name: 'Progressive Text Reveal',
    library: 'CSS + Intersection Observer',
    difficulty: 'Low',
    performanceCost: 'Low',
    dreamType: '정적 몽환',
    useCase: '비평 본문의 문단을 독자의 스크롤 속도에 맞춰 차분히 드러낸다.',
  },
  {
    name: 'Glass Reflection Layer',
    library: 'CSS backdrop-filter',
    difficulty: 'Medium',
    performanceCost: 'Medium',
    dreamType: '반사적 몽환',
    useCase: '이미지 감상 실험에서 관찰자와 표면의 경계를 흐린다.',
  },
  {
    name: 'Indexed Hover Matrix',
    library: 'React State',
    difficulty: 'Low',
    performanceCost: 'Low',
    dreamType: '서간적 몽환',
    useCase: '개념 사전이나 효과 라이브러리에서 항목 간 관계를 빠르게 비교한다.',
  },
  {
    name: 'Subtle Parallax Stack',
    library: 'CSS transform',
    difficulty: 'Medium',
    performanceCost: 'Low',
    dreamType: '공간적 몽환',
    useCase: '실험작 전시장 카드에 깊이감을 주되 본문 가독성은 유지한다.',
  },
  {
    name: 'Audio Wave Skeleton',
    library: 'Canvas API',
    difficulty: 'High',
    performanceCost: 'Medium',
    dreamType: '청각적 회상 몽환',
    useCase: '사운드 아트 분석에서 노이즈 밀도와 반복 구간을 시각화한다.',
  },
];
