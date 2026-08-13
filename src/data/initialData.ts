import { ProfileInfo, Project, SkillItem, KeywordItem, ProcessStep, CategoryItem, PlaygroundItem } from '../types';

export const initialCategories: CategoryItem[] = [
  { id: 'Commercial', label: 'Commercial', desc: '브랜드 광고 영상' },
  { id: 'Motion Graphic', label: 'Motion Graphic', desc: '모션그래픽' },
  { id: 'Promotion', label: 'Promotion', desc: '홍보영상' },
  { id: 'SNS Contents', label: 'SNS Contents', desc: '릴스 / 숏폼' },
  { id: 'Brand Film', label: 'Brand Film', desc: '브랜드 필름' },
];

export const initialProfile: ProfileInfo = {
  name: '전민영',
  englishName: 'MINYOUNG CHEON',
  title: 'Video Designer',
  tagline: '신뢰를 바탕으로 디테일까지 완성하는 영상디자이너',
  bioParagraphs: [
    '안녕하세요. 영상디자이너 전민영입니다.',
    '저는 단순히 보기 좋은 영상을 만드는 것이 아니라, 기획 의도를 정확하게 이해하고 디테일까지 세심하게 완성하는 것을 가장 중요하게 생각합니다.',
    '작은 요소 하나도 결과물의 완성도를 결정한다고 믿으며, 신뢰를 바탕으로 꾸준히 소통하며 프로젝트를 진행합니다.',
    '브랜드가 전달하고 싶은 메시지를 가장 효과적인 영상으로 표현하기 위해 항상 고민하고 발전하는 디자이너가 되고자 합니다.'
  ],
  email: 'example@email.com',
  phone: '010-1234-5678',
  showreelVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  profileImageUrl: ''
};

export const initialKeywords: KeywordItem[] = [
  {
    key: 'Trust',
    title: 'Trust',
    subtitle: '신뢰감 있는 파트너십',
    description: '약속한 일정과 품질을 지키는 작업. 철저한 기한 준수와 정직한 커뮤니케이션을 지킵니다.'
  },
  {
    key: 'Detail',
    title: 'Detail',
    subtitle: '섬세한 마감',
    description: '디테일까지 놓치지 않는 영상 제작. 프레임 단위의 모션 정밀도와 감각적인 색보정을 제공합니다.'
  },
  {
    key: 'Communication',
    title: 'Communication',
    subtitle: '원활한 소통',
    description: '원활한 소통을 통한 프로젝트 진행. 클라이언트의 의도를 경청하고 최선의 피드백 조율을 끌어냅니다.'
  },
  {
    key: 'Creativity',
    title: 'Creativity',
    subtitle: '감각적인 비주얼',
    description: '새로운 아이디어를 영상으로 구현. 트렌디하면서도 본질에 충실한 그래픽 연출 기법을 연구합니다.'
  }
];

export const initialSkills: SkillItem[] = [
  {
    id: 'ae',
    name: 'After Effects',
    category: 'Motion Graphics',
    rating: 5,
    percentage: 95,
    description: '고급 모션 그래픽, 키프레임 애니메이션, 합성, VFX 및 세련된 타이포그래피 모션 연출'
  },
  {
    id: 'pr',
    name: 'Premiere Pro',
    category: 'Video Editing',
    rating: 5,
    percentage: 95,
    description: '리듬감 있는カット 편집, 사운드 믹싱, 컬러 그레이딩 및 완성도 높은 마스터링'
  },
  {
    id: 'ps',
    name: 'Photoshop',
    category: 'Graphic Design',
    rating: 4,
    percentage: 85,
    description: '영상 프레임 아트워크 기획, 섬세한 리터칭, 썸네일 디자인 및 비주얼 에셋 리소스 제작'
  },
  {
    id: 'ai',
    name: 'Illustrator',
    category: 'Vector Assets',
    rating: 4,
    percentage: 80,
    description: '모션 그래픽용 벡터 캐릭터 및 아이콘, 아트보드 스토리보드 레이아웃 디자인'
  },
  {
    id: 'c4d',
    name: 'Cinema 4D',
    category: '3D Graphics',
    rating: 3,
    percentage: 65,
    description: '3D 로고 라이팅/메테리얼 연출, 기초 3D 모션 그래픽 및 카메라 워크 구성'
  }
];

export const processSteps: ProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Planning',
    koreanTitle: '기획 및 콘셉트 설정',
    description: '클라이언트의 타겟과 핵심 메시지를 분석하여 최적의 영상 콘셉트와 방향성을 확립합니다.'
  },
  {
    stepNumber: '02',
    title: 'Storyboard',
    koreanTitle: '스토리보드 제작',
    description: '씬별 구도, 텍스트 배치, 모션 가이드를 포함한 정교한 스토리보드를 구성하여 제작 오차를 줄입니다.'
  },
  {
    stepNumber: '03',
    title: 'Production',
    koreanTitle: '영상 제작',
    description: '고품질 소스 촬영, 그래픽 에셋 디자인 및 3D/2D 모션 요소를 정밀하게 구축합니다.'
  },
  {
    stepNumber: '04',
    title: 'Editing',
    koreanTitle: '편집 및 모션그래픽',
    description: '몰입감 높은 리듬 편집, 사운드 디자인, After Effects 모션 합성을 통합 진행합니다.'
  },
  {
    stepNumber: '05',
    title: 'Feedback',
    koreanTitle: '피드백 반영',
    description: '클라이언트와 실시간으로 세밀한 디테일, 색감, 타이밍을 점검하고 검수 피드백을 신속히 반영합니다.'
  },
  {
    stepNumber: '06',
    title: 'Final',
    koreanTitle: '최종 결과물',
    description: '각 채널별(유튜브, TVC, SNS) 최적화 포맷으로 인코딩하여 최종 마스터본을 전달합니다.'
  }
];

export const initialProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'LUXE AUTOMOTIVE - Launch Commercial',
    category: 'Commercial',
    subtitle: '프리미엄 전기차 브랜드 런칭 TVC 광고 영상',
    thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    period: '2026.01 - 2026.02 (4주)',
    roles: ['기획', '촬영', '편집', '모션그래픽', '컬러그레이딩'],
    tools: ['Premiere Pro', 'After Effects', 'Photoshop', 'DaVinci Resolve'],
    overview: '미래지향적 프리미엄 세단의 조용한 역동성을 시각화하기 위해 임팩트 있는 리듬 편집과 다크모드 기반의 하이라이트 모션을 연출하였습니다.',
    process: [
      {
        title: '01. 톤앤매너 설정',
        description: '차량의 묵직하고 세련된 라인을 극대화하기 위해 딥 블루와 블랙 콘트라스트 조명 구도를 설정했습니다.'
      },
      {
        title: '02. 컷 편집 & 모션 트래킹',
        description: '속도감에 맞춘 빠른 음악 비트 매칭과 차체 HUD 디스플레이 효과를 After Effects로 트래킹 합성하였습니다.'
      },
      {
        title: '03. 사운드 믹스 & 최종 렌더',
        description: '엔진사운드와 전자음 요소를 다층으로 레이어링하여 시각과 청각의 일치감을 높였습니다.'
      }
    ],
    featured: true
  },
  {
    id: 'proj-2',
    title: 'NEXUS TECH - Brand Motion Graphic',
    category: 'Motion Graphic',
    subtitle: '데이터 플랫폼 서비스의 메커니즘을 설명하는 2D/3D 모션그래픽',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    period: '2025.11 - 2025.12 (3주)',
    roles: ['기획', '아트디렉팅', '모션그래픽'],
    tools: ['After Effects', 'Illustrator', 'Cinema 4D'],
    overview: '복잡한 클라우드 데이터 흐름을 직관적인 인포그래픽 모션과 매끄러운 트랜지션 연출로 풀어내어 서비스 이해도를 높인 영상입니다.',
    process: [
      {
        title: '01. 벡터 에셋 제작',
        description: 'Illustrator를 활용해 명확한 가독성을 가진 데이터 아이콘과 네트워킹 가이드라인 에셋을 설계했습니다.'
      },
      {
        title: '02. 스무스 타이밍 액션',
        description: 'After Effects의 Flow 그래프를 세밀하게 조절하여 부드럽고 자연스러운 이징(Easing) 모션을 연출했습니다.'
      }
    ],
    featured: true
  },
  {
    id: 'proj-3',
    title: 'SEOUL ART CENTER - Season Exhibition Promo',
    category: 'Promotion',
    subtitle: '2026 미디어아트 기획전 홍보 영상',
    thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    period: '2025.09 - 2025.10 (2주)',
    roles: ['기획', '편집', '모션그래픽'],
    tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
    overview: '전시 작품의 몽환적인 분위기를 살려 감각적인 그래픽 텍스트와 비트에 맞춘 영상 스플릿 컷으로 기획전의 기대감을 극대화했습니다.',
    process: [
      {
        title: '01. 타이포그래피 인터랙션',
        description: '전시 타이틀을 영문/한글 혼용 모션으로 오버랩시켜 오프닝 트레일러 분위기를 조성했습니다.'
      },
      {
        title: '02. 영상 이펙트 적용',
        description: '글리치, 크로매틱 어버레이션 효과를 은은하게 배치하여 미디어아트 고유의 느낌을 직관적으로 전달했습니다.'
      }
    ],
    featured: true
  },
  {
    id: 'proj-4',
    title: 'MINIMAL COFFEE - Reels & Short Form Series',
    category: 'SNS Contents',
    subtitle: '스페셜티 커피 브랜딩 숏폼 릴스 콘텐츠 (9:16 최적화)',
    thumbnail: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    period: '2025.08 (1주)',
    roles: ['촬영', '편집', '사운드디자인'],
    tools: ['Premiere Pro', 'After Effects'],
    overview: '모바일 환경에 최적화된 세로형 9:16 비율로, ASMR 요소와 시각적 드립 매커니즘을 강조하여 높은 조회수와 전환율을 기록했습니다.',
    process: [
      {
        title: '01. 모바일 맞춤 구도 촬영',
        description: '클로즈업 매크로 렌즈를 사용하여 원두 가루와 원액 추출 시각 효과를 수직 캔버스에 가득 채웠습니다.'
      },
      {
        title: '02. 트렌디한 자막 연출',
        description: '모바일 가독성이 뛰어난 산세리프 폰트를 활용, 빠른 속도감으로 눈길을 사로잡았습니다.'
      }
    ],
    featured: false
  },
  {
    id: 'proj-5',
    title: 'ORION SOUNDS - Brand Film Story',
    category: 'Brand Film',
    subtitle: '아날로그 음향 기기 브랜드 스토리를 담은 감성 필름',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    period: '2025.05 - 2025.06 (3주)',
    roles: ['기획', '촬영', '편집', '디자인'],
    tools: ['Premiere Pro', 'After Effects', 'Photoshop'],
    overview: '소리에 대한 브랜드 장인정신을 다큐멘터리 스타일의 차분한 시선과 필름 텍스처로 풀어낸 감성 브랜드 필름입니다.',
    process: [
      {
        title: '01. 필름 그레인 & 컬러 톤 작업',
        description: '따뜻하면서도 시대를 초월한 클래식 필름 색감을 구현하기 위해 전용 LUT와 손수 제작한 필름 그레인을 채택했습니다.'
      },
      {
        title: '02. 나레이션 오디오 정밀 동기화',
        description: '목소리의 톤과 어조에 맞춰 영상 커트 이동 시간을 밀리초 단위로 미세 조율했습니다.'
      }
    ],
    featured: false
  }
];

export const initialPlayground: PlaygroundItem[] = [
  {
    id: 'pg-1',
    title: '3D Kinetic Typography',
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    aspectRatio: 'tall',
    tag: '3D Motion',
    description: '3D 타이포그래피 모션 및 라이팅 실험'
  },
  {
    id: 'pg-2',
    title: 'Neon Cyberpunk Visual Loop',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'square',
    tag: 'GIF / Concept',
    description: '네온 사이버펑크 톤앤매너 비주얼 아트'
  },
  {
    id: 'pg-3',
    title: 'Abstract Fluid Glassmorphism',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'wide',
    tag: '3D Render',
    description: '유리 질감과 은은한 빛 반사 애니메이션'
  },
  {
    id: 'pg-4',
    title: 'Dynamic VFX Particle Test',
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    aspectRatio: 'normal',
    tag: 'VFX / Simulation',
    description: '파티클 시뮬레이션 및 속도감 실험 영상'
  },
  {
    id: 'pg-5',
    title: 'Glitch & Chromatic Aberration',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80',
    aspectRatio: 'tall',
    tag: 'Experimental',
    description: '글리치 왜곡 기법을 활용한 텍스처 매핑'
  },
  {
    id: 'pg-6',
    title: 'Short Motion Loop FX',
    type: 'video',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    aspectRatio: 'wide',
    tag: 'Short Loop',
    description: '감각적인 비트 매칭 숏폼 모션 그래픽'
  }
];
