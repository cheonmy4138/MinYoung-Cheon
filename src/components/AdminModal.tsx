import React, { useState } from 'react';
import {
  X,
  Lock,
  Plus,
  Trash2,
  Edit2,
  Save,
  RotateCcw,
  ShieldCheck,
  Check,
  Film,
  User,
  Wrench,
  AlertCircle,
  Upload,
  Phone,
  FileVideo,
  Tag,
  ChevronUp,
  ChevronDown,
  CheckCircle,
  Sparkles,
  Image as ImageIcon,
  GripVertical
} from 'lucide-react';
import { Project, ProfileInfo, SkillItem, CategoryType, CategoryItem, PlaygroundItem } from '../types';

const PlaygroundItemThumbnail: React.FC<{ item: PlaygroundItem }> = ({ item }) => {
  const [hasError, setHasError] = useState(false);
  const url = (item.url || '').trim();

  React.useEffect(() => {
    setHasError(false);
  }, [url, item.type]);

  const isVideo =
    item.type === 'video' ||
    /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url) ||
    url.includes('.mp4') ||
    url.includes('.webm');

  if (!url || hasError) {
    return (
      <div
        className="w-[50px] h-[50px] rounded bg-white/5 border border-white/10 flex flex-col items-center justify-center shrink-0 text-white/30 font-mono select-none"
        title="미디어 없음 또는 로드 실패"
      >
        <ImageIcon className="w-4 h-4 mb-0.5 opacity-40 text-white/40" />
        <span className="text-[8px] leading-none text-white/30 font-bold">NO MEDIA</span>
      </div>
    );
  }

  if (isVideo) {
    return (
      <div className="w-[50px] h-[50px] rounded bg-black/80 border border-white/15 overflow-hidden shrink-0 relative flex items-center justify-center shadow-sm">
        <video
          src={url}
          muted
          playsInline
          loop
          autoPlay
          preload="metadata"
          controls={false}
          disablePictureInPicture
          className="w-full h-full object-cover pointer-events-none select-none"
          onError={() => setHasError(true)}
        />
        <div className="absolute bottom-0.5 right-0.5 bg-black/80 text-[7px] font-mono font-bold text-[#2BB6A3] px-1 py-0.2 rounded border border-white/10">
          MP4
        </div>
      </div>
    );
  }

  return (
    <div className="w-[50px] h-[50px] rounded bg-black/80 border border-white/15 overflow-hidden shrink-0 relative flex items-center justify-center shadow-sm">
      <img
        src={url}
        alt={item.title}
        className="w-full h-full object-cover pointer-events-none select-none"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  categories: CategoryItem[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryItem[]>>;
  playgroundItems?: PlaygroundItem[];
  setPlaygroundItems?: React.Dispatch<React.SetStateAction<PlaygroundItem[]>>;
  playgroundSubtitle?: string;
  setPlaygroundSubtitle?: React.Dispatch<React.SetStateAction<string>>;
  profile: ProfileInfo;
  setProfile: React.Dispatch<React.SetStateAction<ProfileInfo>>;
  skills: SkillItem[];
  setSkills: React.Dispatch<React.SetStateAction<SkillItem[]>>;
  onResetData: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  onLoginSuccess,
  projects,
  setProjects,
  categories,
  setCategories,
  playgroundItems = [],
  setPlaygroundItems,
  playgroundSubtitle = "Experimental designs and side projects crafted to push boundaries.",
  setPlaygroundSubtitle,
  profile,
  setProfile,
  skills,
  setSkills,
  onResetData
}) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<'projects' | 'categories' | 'playground' | 'profile' | 'skills'>('projects');

  // Category Edit State
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDesc, setNewCategoryDesc] = useState('');

  // Edit Project State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [rolesInput, setRolesInput] = useState('');
  const [toolsInput, setToolsInput] = useState('');

  // Confirm Delete States
  const [deletingCatId, setDeletingCatId] = useState<string | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  // Playground Drag & Drop Reorder State
  const [draggedPlaygroundIdx, setDraggedPlaygroundIdx] = useState<number | null>(null);
  const [dragOverPlaygroundIdx, setDragOverPlaygroundIdx] = useState<number | null>(null);

  const handlePlaygroundReorder = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx || !setPlaygroundItems || fromIdx < 0 || toIdx < 0) return;
    const updated = [...playgroundItems];
    const [movedItem] = updated.splice(fromIdx, 1);
    updated.splice(toIdx, 0, movedItem);
    setPlaygroundItems(updated);
    showNotification('카드 순서가 변경되었습니다.');
  };

  // Success Notification banner
  const [savedSuccessMsg, setSavedSuccessMsg] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const handleShowreelFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProfile((prev) => ({ ...prev, showreelVideoUrl: reader.result as string }));
          showNotification(`PC 파일 '${file.name}'이(가) 히어로 비디오로 선택되었습니다.`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectThumbnailFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다 (.jpg, .png, .webp, .gif 등)');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setEditingProject((prev) => (prev ? { ...prev, thumbnail: reader.result as string } : null));
          showNotification(`'${file.name}' 이미지가 포트폴리오 썸네일로 설정되었습니다.`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다 (.jpg, .png, .webp, .gif 등)');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setProfile((prev) => ({ ...prev, profileImageUrl: reader.result as string }));
          showNotification(`'${file.name}' 사진이 프로필 증명사진으로 등록되었습니다.`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '0225') {
      setPasswordError(false);
      onLoginSuccess();
    } else {
      setPasswordError(true);
    }
  };

  const showNotification = (msg: string) => {
    setSavedSuccessMsg(msg);
    setTimeout(() => setSavedSuccessMsg(''), 3000);
  };

  // --- Project Management Handlers ---
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    const finalProject: Project = {
      ...editingProject,
      roles: rolesInput.split(',').map((s) => s.trim()).filter(Boolean),
      tools: toolsInput.split(',').map((s) => s.trim()).filter(Boolean)
    };

    if (isCreatingProject) {
      setProjects([finalProject, ...projects]);
      showNotification('새 프로젝트가 성공적으로 등록되었습니다.');
    } else {
      setProjects(projects.map((p) => (p.id === finalProject.id ? finalProject : p)));
      showNotification('프로젝트 정보가 수정되었습니다.');
    }

    setEditingProject(null);
    setIsCreatingProject(false);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    setDeletingProjectId(null);
    showNotification('프로젝트가 삭제되었습니다.');
  };

  const handleMoveProjectUp = (index: number) => {
    if (index <= 0) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[index - 1];
    updated[index - 1] = temp;
    setProjects(updated);
    showNotification(`'${temp.title}' 순서가 위로 이동되었습니다.`);
  };

  const handleMoveProjectDown = (index: number) => {
    if (index >= projects.length - 1) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[index + 1];
    updated[index + 1] = temp;
    setProjects(updated);
    showNotification(`'${temp.title}' 순서가 아래로 이동되었습니다.`);
  };

  // --- Category Management Handlers ---
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (categories.some((c) => c.id === trimmed || c.label === trimmed)) {
      showNotification('이미 존재하는 카테고리 이름입니다.');
      return;
    }
    const newCatItem: CategoryItem = {
      id: trimmed,
      label: trimmed,
      desc: newCategoryDesc.trim() || undefined
    };
    setCategories([...categories, newCatItem]);
    setNewCategoryName('');
    setNewCategoryDesc('');
    showNotification(`'${trimmed}' 카테고리가 새롭게 추가되었습니다.`);
  };

  const handleUpdateCategoryLabel = (oldId: string, newLabel: string, newDesc?: string) => {
    const trimmed = newLabel.trim();
    if (!trimmed) return;

    setCategories(
      categories.map((c) => {
        if (c.id === oldId) {
          return { id: trimmed, label: trimmed, desc: newDesc };
        }
        return c;
      })
    );

    if (oldId !== trimmed) {
      setProjects((prev) =>
        prev.map((p) => (p.category === oldId ? { ...p, category: trimmed } : p))
      );
    }
    showNotification(`카테고리 '${trimmed}' 변경사항이 저장되었습니다.`);
  };

  const handleDeleteCategory = (catId: string) => {
    if (categories.length <= 1) {
      showNotification('최소 1개의 카테고리는 유지되어야 합니다.');
      setDeletingCatId(null);
      return;
    }

    const targetCat = categories.find((c) => c.id === catId);
    const catLabel = targetCat?.label || catId;
    const remainingCat = categories.find((c) => c.id !== catId);
    const fallbackCatId = remainingCat ? remainingCat.id : 'Commercial';

    // 해당 카테고리를 가지던 프로젝트들은 남아있는 다른 카테고리로 변경
    setProjects((prev) =>
      prev.map((p) => (p.category === catId ? { ...p, category: fallbackCatId } : p))
    );

    setCategories((prev) => prev.filter((c) => c.id !== catId));
    setDeletingCatId(null);
    showNotification(`'${catLabel}' 카테고리가 성공적으로 삭제되었습니다.`);
  };

  const startCreateProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: '새로운 영상 프로젝트',
      category: categories[0]?.id || 'Commercial',
      subtitle: '프로젝트 한 줄 설명',
      thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
      period: '2026.02 (2주)',
      roles: ['기획', '편집', '모션그래픽'],
      tools: ['Premiere Pro', 'After Effects'],
      overview: '프로젝트 기획 의도 및 컨셉 세부 설명입니다.',
      process: [
        { title: '01. 기획', description: '콘셉트 및 방향성 정의' },
        { title: '02. 제작', description: '편집 및 효과 작업' }
      ]
    };
    setEditingProject(newProj);
    setRolesInput(newProj.roles.join(', '));
    setToolsInput(newProj.tools.join(', '));
    setIsCreatingProject(true);
  };

  // --- Profile Save Handler ---
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showNotification('프로필 및 쇼릴 정보가 저장되었습니다.');
  };

  // --- Skill Update Handler ---
  const handleUpdateSkill = (id: string, field: keyof SkillItem, value: any) => {
    setSkills(skills.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#161616] border border-white/10 rounded-md shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#111111]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2BB6A3]" />
            <h3 className="text-base font-extrabold text-white">
              ADMIN DASHBOARD <span className="text-xs font-mono font-normal text-white/50">(비밀번호: 0225)</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Banner */}
        {savedSuccessMsg && (
          <div className="bg-[#2BB6A3]/20 border-b border-[#2BB6A3] px-6 py-3 text-xs text-[#2BB6A3] font-bold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-[#2BB6A3]" />
            <span>{savedSuccessMsg}</span>
          </div>
        )}

        {/* Content Body */}
        {!isLoggedIn ? (
          /* Password Authentication Gate */
          <div className="p-10 text-center max-w-md mx-auto my-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#2BB6A3]/10 border border-[#2BB6A3]/30 text-[#2BB6A3] flex items-center justify-center mx-auto">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-xl font-bold text-white">관리자 비밀번호 입력</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                포트폴리오 및 기획서 내용을 관리하려면 비밀번호 <code className="text-[#2BB6A3] font-mono font-bold">0225</code>를 입력해 주세요.
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password (0225)"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  className={`w-full px-4 py-3 bg-white/5 border ${
                    passwordError ? 'border-red-500' : 'border-white/20'
                  } text-white font-mono text-center tracking-widest text-lg rounded-sm focus:outline-none focus:border-[#2BB6A3]`}
                  autoFocus
                />
                {passwordError && (
                  <p className="text-xs text-red-400 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> 비밀번호가 일치하지 않습니다. (0225)
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#E06D3B] text-white text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#d45c2a] transition-colors shadow-lg shadow-[#E06D3B]/20"
              >
                관리자 로그인
              </button>
            </form>
          </div>
        ) : (
          /* Admin Main Controls Dashboard */
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Admin Tabs */}
            <div className="flex border-b border-white/10 bg-[#111111]/50 px-6 pt-2 gap-4">
              <button
                onClick={() => setActiveTab('projects')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'projects'
                    ? 'border-[#2BB6A3] text-[#2BB6A3]'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Film className="w-4 h-4" /> 포트폴리오 관리 ({projects.length})
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'categories'
                    ? 'border-[#2BB6A3] text-[#2BB6A3]'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Tag className="w-4 h-4" /> 카테고리 설정 ({categories.length})
              </button>

              <button
                onClick={() => setActiveTab('playground')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'playground'
                    ? 'border-[#2BB6A3] text-[#2BB6A3]'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Sparkles className="w-4 h-4" /> 플레이그라운드 ({playgroundItems.length})
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'profile'
                    ? 'border-[#2BB6A3] text-[#2BB6A3]'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <User className="w-4 h-4" /> 프로필 & 쇼릴 설정
              </button>

              <button
                onClick={() => setActiveTab('skills')}
                className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-colors ${
                  activeTab === 'skills'
                    ? 'border-[#2BB6A3] text-[#2BB6A3]'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                <Wrench className="w-4 h-4" /> 기술 스택 관리
              </button>
            </div>

            {/* TAB 1: PROJECTS MANAGEMENT */}
            {activeTab === 'projects' && (
              <div className="p-6 space-y-6">
                {!editingProject ? (
                  <>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-white/60">
                        포트폴리오 카드를 수정하거나 새로운 영상 프로젝트를 추가하세요.
                      </p>
                      <button
                        onClick={startCreateProject}
                        className="px-4 py-2 bg-[#E06D3B] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-2 hover:bg-[#d45c2a] transition-colors shadow-md"
                      >
                        <Plus className="w-4 h-4" /> 새 프로젝트 추가
                      </button>
                    </div>

                    <div className="space-y-3">
                      {projects.map((proj, idx) => (
                        <div
                          key={proj.id}
                          className="p-3.5 sm:p-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] rounded-sm flex items-center justify-between gap-3 sm:gap-4 transition-colors"
                        >
                          <div className="flex items-center gap-3 sm:gap-4 truncate">
                            <span className="text-xs font-mono font-bold text-white/30 w-5 text-right shrink-0">
                              {idx + 1}
                            </span>
                            <img
                              src={proj.thumbnail}
                              alt={proj.title}
                              className="w-16 h-10 object-cover rounded-xs border border-white/10 shrink-0"
                            />
                            <div className="truncate">
                              <span className="text-[10px] uppercase font-mono font-bold text-[#2BB6A3] block">
                                {proj.category}
                              </span>
                              <h4 className="text-sm font-bold text-white truncate">{proj.title}</h4>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleMoveProjectUp(idx)}
                              disabled={idx === 0}
                              className={`p-1.5 rounded-sm border border-white/10 transition-colors ${
                                idx === 0
                                  ? 'opacity-25 cursor-not-allowed text-white/30'
                                  : 'text-white/80 hover:text-[#2BB6A3] hover:bg-white/10 hover:border-[#2BB6A3]/40'
                              }`}
                              title={idx === 0 ? '첫 번째 항목입니다' : '위로 이동 (▲)'}
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleMoveProjectDown(idx)}
                              disabled={idx === projects.length - 1}
                              className={`p-1.5 rounded-sm border border-white/10 transition-colors ${
                                idx === projects.length - 1
                                  ? 'opacity-25 cursor-not-allowed text-white/30'
                                  : 'text-white/80 hover:text-[#2BB6A3] hover:bg-white/10 hover:border-[#2BB6A3]/40'
                              }`}
                              title={idx === projects.length - 1 ? '마지막 항목입니다' : '아래로 이동 (▼)'}
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setEditingProject(proj);
                                setRolesInput(proj.roles ? proj.roles.join(', ') : '');
                                setToolsInput(proj.tools ? proj.tools.join(', ') : '');
                                setIsCreatingProject(false);
                              }}
                              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-sm transition-colors border border-transparent"
                              title="수정"
                            >
                              <Edit2 className="w-4 h-4 text-[#2BB6A3]" />
                            </button>
                            {deletingProjectId === proj.id ? (
                              <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/30 p-1 rounded-xs">
                                <span className="text-[10px] text-red-400 font-mono font-bold pl-1">삭제?</span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteProject(proj.id)}
                                  className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold rounded-xs transition-colors"
                                >
                                  확인
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeletingProjectId(null)}
                                  className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white/70 text-[10px] rounded-xs transition-colors"
                                >
                                  취소
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setDeletingProjectId(proj.id)}
                                className="p-1.5 text-white/70 hover:text-red-400 hover:bg-white/10 rounded-sm transition-colors border border-transparent"
                                title="삭제"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  /* Edit / Create Form */
                  <form onSubmit={handleSaveProject} className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/10 pb-4">
                      <h4 className="text-sm font-bold text-[#2BB6A3] uppercase font-mono">
                        {isCreatingProject ? '새 프로젝트 작성' : '프로젝트 수정'}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProject(null);
                          setIsCreatingProject(false);
                        }}
                        className="text-xs text-white/50 hover:text-white"
                      >
                        취소하고 돌아가기
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-white/60">프로젝트명 *</label>
                        <input
                          type="text"
                          required
                          value={editingProject.title}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-white/60">카테고리 *</label>
                        <select
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full px-3 py-2 bg-[#181818] border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                        >
                          {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.label}
                            </option>
                          ))}
                          {!categories.some((c) => c.id === editingProject.category) && (
                            <option value={editingProject.category}>{editingProject.category}</option>
                          )}
                        </select>
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[11px] font-mono text-white/60">한 줄 요약 (Subtitle)</label>
                        <input
                          type="text"
                          value={editingProject.subtitle}
                          onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                        />
                      </div>

                      {/* Portfolio Thumbnail Image Upload & URL */}
                      <div className="sm:col-span-2 space-y-2 border border-[#2BB6A3]/30 bg-[#2BB6A3]/5 p-4 rounded-sm">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-mono text-[#2BB6A3] font-bold flex items-center gap-2">
                            <ImageIcon className="w-4 h-4 text-[#2BB6A3]" />
                            <span>포트폴리오 썸네일 이미지 설정 (내 컴퓨터 파일 선택 / URL)</span>
                          </label>
                          {editingProject.thumbnail && (
                            <span className="text-[10px] font-mono text-[#2BB6A3] font-bold bg-[#2BB6A3]/10 px-2 py-0.5 rounded-xs border border-[#2BB6A3]/20">
                              ✓ 이미지 등록됨
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-1">
                          {/* Image Preview Box */}
                          <div className="relative aspect-video w-full rounded-sm overflow-hidden border border-white/20 bg-black/60 group flex items-center justify-center">
                            {editingProject.thumbnail ? (
                              <img
                                src={editingProject.thumbnail}
                                alt="Thumbnail Preview"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center text-white/40 text-[11px] font-mono p-2 text-center">
                                <ImageIcon className="w-6 h-6 mb-1 opacity-50 text-[#2BB6A3]" />
                                <span>이미지 없음</span>
                              </div>
                            )}
                            <div className="absolute top-1.5 left-1.5 bg-black/80 px-2 py-0.5 rounded text-[9px] font-mono text-white/80">
                              미리보기
                            </div>
                          </div>

                          {/* Upload Controls */}
                          <div className="sm:col-span-2 space-y-2.5">
                            <label className="cursor-pointer bg-white/10 hover:bg-[#2BB6A3] hover:text-white border border-white/20 text-white text-xs font-bold py-2.5 px-4 rounded-sm flex items-center justify-center gap-2 transition-all group shadow-md">
                              <Upload className="w-4 h-4 text-[#2BB6A3] group-hover:text-white transition-colors" />
                              <span>내 PC에서 이미지 파일 선택 (.jpg, .png, .webp, .gif)</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleProjectThumbnailFileUpload}
                                className="hidden"
                              />
                            </label>

                            <div>
                              <label className="text-[10px] font-mono text-white/50 block mb-1">
                                또는 외부 웹 이미지 URL 직접 입력:
                              </label>
                              <input
                                type="text"
                                value={editingProject.thumbnail}
                                onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                                placeholder="https://.../image.jpg 또는 data:image/..."
                                className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-[#2BB6A3] font-bold flex items-center justify-between">
                          <span>비디오 URL (유튜브 링크 / mp4 직링크)</span>
                          <span className="text-[10px] text-white/40 font-normal">YouTube URL 자동 감지 및 재생</span>
                        </label>
                        <input
                          type="text"
                          placeholder="https://www.youtube.com/watch?v=... 또는 https://youtu.be/..."
                          value={editingProject.videoUrl}
                          onChange={(e) => setEditingProject({ ...editingProject, videoUrl: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-white/60">제작 기간 (Period)</label>
                        <input
                          type="text"
                          value={editingProject.period}
                          onChange={(e) => setEditingProject({ ...editingProject, period: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-mono text-white/60">담당 역할 (콤마 , 로 구분)</label>
                        <input
                          type="text"
                          value={rolesInput}
                          onChange={(e) => {
                            const val = e.target.value;
                            setRolesInput(val);
                            if (editingProject) {
                              setEditingProject({
                                ...editingProject,
                                roles: val.split(',').map((s) => s.trim()).filter(Boolean)
                              });
                            }
                          }}
                          placeholder="기획, 편집, 모션그래픽"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[11px] font-mono text-white/60">사용 툴 (콤마 , 로 구분)</label>
                        <input
                          type="text"
                          value={toolsInput}
                          onChange={(e) => {
                            const val = e.target.value;
                            setToolsInput(val);
                            if (editingProject) {
                              setEditingProject({
                                ...editingProject,
                                tools: val.split(',').map((s) => s.trim()).filter(Boolean)
                              });
                            }
                          }}
                          placeholder="Premiere Pro, After Effects"
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-[11px] font-mono text-white/60">기획 의도 (Overview)</label>
                        <textarea
                          rows={4}
                          value={editingProject.overview}
                          onChange={(e) => setEditingProject({ ...editingProject, overview: e.target.value })}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none resize-none"
                        />
                      </div>

                      {/* Production Process (제작 과정) Section */}
                      <div className="sm:col-span-2 space-y-3 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-mono text-[#2BB6A3] font-bold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-[#E06D3B]" />
                            <span>제작 과정 (PRODUCTION PROCESS) 단계 설정</span>
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              const currentProc = editingProject.process || [];
                              const nextStepNum = String(currentProc.length + 1).padStart(2, '0');
                              setEditingProject({
                                ...editingProject,
                                process: [
                                  ...currentProc,
                                  { title: `${nextStepNum}. 단계 제목`, description: '단계에 대한 세부 설명' }
                                ]
                              });
                            }}
                            className="px-3 py-1.5 bg-[#2BB6A3]/10 hover:bg-[#2BB6A3] text-[#2BB6A3] hover:text-white border border-[#2BB6A3]/30 text-xs font-bold rounded-sm transition-all flex items-center gap-1.5 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" /> 단계 추가
                          </button>
                        </div>

                        <div className="space-y-3">
                          {(!editingProject.process || editingProject.process.length === 0) ? (
                            <div className="p-4 border border-dashed border-white/10 rounded-sm text-center text-xs text-white/40 font-mono">
                              등록된 제작 과정 단계가 없습니다. 위의 '+ 단계 추가' 버튼을 눌러 추가하세요.
                            </div>
                          ) : (
                            editingProject.process.map((step, pIdx) => (
                              <div
                                key={pIdx}
                                className="p-3.5 border border-white/10 bg-white/[0.02] rounded-sm space-y-3 relative group"
                              >
                                <div className="flex items-center justify-between gap-2 border-b border-white/5 pb-2">
                                  <span className="text-[11px] font-mono font-bold text-[#2BB6A3]">
                                    단계 {pIdx + 1}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (pIdx <= 0) return;
                                        const updated = [...editingProject.process];
                                        const temp = updated[pIdx];
                                        updated[pIdx] = updated[pIdx - 1];
                                        updated[pIdx - 1] = temp;
                                        setEditingProject({ ...editingProject, process: updated });
                                      }}
                                      disabled={pIdx === 0}
                                      className="p-1 text-white/60 hover:text-[#2BB6A3] disabled:opacity-20 transition-colors"
                                      title="위로 이동"
                                    >
                                      <ChevronUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (pIdx >= editingProject.process.length - 1) return;
                                        const updated = [...editingProject.process];
                                        const temp = updated[pIdx];
                                        updated[pIdx] = updated[pIdx + 1];
                                        updated[pIdx + 1] = temp;
                                        setEditingProject({ ...editingProject, process: updated });
                                      }}
                                      disabled={pIdx === editingProject.process.length - 1}
                                      className="p-1 text-white/60 hover:text-[#2BB6A3] disabled:opacity-20 transition-colors"
                                      title="아래로 이동"
                                    >
                                      <ChevronDown className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = editingProject.process.filter((_, idx) => idx !== pIdx);
                                        setEditingProject({ ...editingProject, process: updated });
                                      }}
                                      className="p-1 text-white/50 hover:text-red-400 transition-colors ml-1"
                                      title="단계 삭제"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-[10px] font-mono text-white/50 block">단계 제목</label>
                                    <input
                                      type="text"
                                      placeholder="예: 01. 톤앤매너 설정"
                                      value={step.title}
                                      onChange={(e) => {
                                        const updated = editingProject.process.map((item, idx) =>
                                          idx === pIdx ? { ...item, title: e.target.value } : item
                                        );
                                        setEditingProject({ ...editingProject, process: updated });
                                      }}
                                      className="w-full px-2.5 py-1.5 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                                    />
                                  </div>

                                  <div className="sm:col-span-2 space-y-1">
                                    <label className="text-[10px] font-mono text-white/50 block">단계 세부 설명</label>
                                    <textarea
                                      rows={2}
                                      placeholder="제작 과정에 대한 세부 설명을 입력하세요."
                                      value={step.description}
                                      onChange={(e) => {
                                        const updated = editingProject.process.map((item, idx) =>
                                          idx === pIdx ? { ...item, description: e.target.value } : item
                                        );
                                        setEditingProject({ ...editingProject, process: updated });
                                      }}
                                      className="w-full px-2.5 py-1.5 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none resize-none"
                                    />
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-5 py-2.5 bg-white/10 text-xs text-white font-bold rounded-sm hover:bg-white/20"
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#E06D3B] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#d45c2a] flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" /> 프로젝트 저장
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* TAB: CATEGORIES MANAGEMENT */}
            {activeTab === 'categories' && (
              <div className="p-6 space-y-8">
                {/* Add New Category Box */}
                <form onSubmit={handleAddCategory} className="p-5 border border-[#2BB6A3]/30 bg-[#2BB6A3]/5 rounded-sm space-y-4">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#2BB6A3]" />
                    <h4 className="text-xs font-bold text-[#2BB6A3] uppercase tracking-wider">
                      새 카테고리 추가
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-mono text-white/60">카테고리 이름 *</label>
                      <input
                        type="text"
                        required
                        placeholder="예: 3D Motion, Commercial..."
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[11px] font-mono text-white/60">설명 (선택사항)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="예: 3D 그래픽 및 특수효과 영상"
                          value={newCategoryDesc}
                          onChange={(e) => setNewCategoryDesc(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-5 py-2 bg-[#E06D3B] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#d45c2a] flex items-center gap-1.5 shrink-0 shadow-md"
                        >
                          <Plus className="w-4 h-4" /> 추가
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Existing Categories List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <h4 className="text-xs font-bold text-white/80 uppercase tracking-wider">
                      등록된 포트폴리오 카테고리 목록 ({categories.length})
                    </h4>
                    <span className="text-[10px] text-white/40 font-mono">
                      * 이름을 수정하면 기존 프로젝트의 카테고리도 자동 업데이트됩니다.
                    </span>
                  </div>

                  <div className="space-y-3">
                    {categories.map((cat, idx) => {
                      const projectCount = projects.filter((p) => p.category === cat.id).length;
                      return (
                        <div
                          key={cat.id || idx}
                          className="p-4 border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] rounded-sm grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                        >
                          {/* Category Name Input */}
                          <div className="sm:col-span-4 space-y-1">
                            <label className="text-[10px] font-mono text-white/40 block">카테고리명</label>
                            <input
                              type="text"
                              value={cat.label}
                              onChange={(e) => handleUpdateCategoryLabel(cat.id, e.target.value, cat.desc)}
                              className="w-full px-3 py-1.5 bg-white/5 border border-white/10 text-white text-xs font-bold rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                            />
                          </div>

                          {/* Category Description Input */}
                          <div className="sm:col-span-5 space-y-1">
                            <label className="text-[10px] font-mono text-white/40 block">설명</label>
                            <input
                              type="text"
                              value={cat.desc || ''}
                              placeholder="설명 없음"
                              onChange={(e) => handleUpdateCategoryLabel(cat.id, cat.label, e.target.value)}
                              className="w-full px-3 py-1.5 bg-white/5 border border-white/10 text-white/70 text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                            />
                          </div>

                          {/* Project Count & Action */}
                          <div className="sm:col-span-3 flex items-center justify-end gap-3 pt-2 sm:pt-0">
                            <span className="text-[11px] font-mono text-[#2BB6A3] bg-[#2BB6A3]/10 px-2 py-1 rounded-xs border border-[#2BB6A3]/20">
                              {projectCount}개 영상
                            </span>

                            {deletingCatId === cat.id ? (
                              <div className="flex items-center gap-1.5 bg-red-500/10 border border-red-500/30 p-1 rounded-xs">
                                <span className="text-[10px] text-red-400 font-mono font-bold pl-1">삭제?</span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteCategory(cat.id)}
                                  className="px-2 py-0.5 bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold rounded-xs transition-colors"
                                >
                                  확인
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeletingCatId(null)}
                                  className="px-2 py-0.5 bg-white/10 hover:bg-white/20 text-white/70 text-[10px] rounded-xs transition-colors"
                                >
                                  취소
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setDeletingCatId(cat.id)}
                                className="p-2 text-white/50 hover:text-red-400 hover:bg-white/10 rounded-sm transition-colors"
                                title="카테고리 삭제"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PLAYGROUND MANAGEMENT */}
            {activeTab === 'playground' && (
              <div className="p-6 space-y-6">
                {/* Section Subtitle Config */}
                <div className="p-4 border border-[#2BB6A3]/30 bg-[#2BB6A3]/5 rounded-sm space-y-2">
                  <label className="text-xs font-mono text-[#2BB6A3] font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#2BB6A3]" />
                    <span>Playground 섹션 상단 서브 타이틀 문구 설정</span>
                  </label>
                  <input
                    type="text"
                    value={playgroundSubtitle}
                    onChange={(e) => setPlaygroundSubtitle && setPlaygroundSubtitle(e.target.value)}
                    placeholder="Experimental designs and side projects crafted to push boundaries."
                    className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                  />
                </div>

                {/* Header & Add Button */}
                <div className="flex justify-between items-center pb-2 border-b border-white/10">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      플레이그라운드 카드 목록 ({playgroundItems.length})
                    </h4>
                    <p className="text-[10px] text-white/50 font-mono mt-0.5">
                      GIF 애니메이션 및 짧은 영상(MP4/WebM) 카드를 자유롭게 배치할 수 있습니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!setPlaygroundItems) return;
                      const newItem: PlaygroundItem = {
                        id: `pg-${Date.now()}`,
                        title: '새 실험 카드',
                        type: 'image',
                        url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
                        aspectRatio: 'square',
                        tag: '3D Render',
                        description: '실험적 미디어 그래픽 세부 설명'
                      };
                      setPlaygroundItems([...playgroundItems, newItem]);
                      showNotification('새 플레이그라운드 카드가 추가되었습니다.');
                    }}
                    className="px-3.5 py-2 bg-[#2BB6A3] text-white text-xs font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 hover:bg-[#239988] transition-colors shadow-md"
                  >
                    <Plus className="w-4 h-4" /> 카드 추가
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-4">
                  {playgroundItems.length === 0 ? (
                    <div className="p-6 border border-dashed border-white/10 text-center font-mono text-xs text-white/40 rounded-sm">
                      등록된 플레이그라운드 카드가 없습니다. '+ 카드 추가' 버튼을 눌러보세요.
                    </div>
                  ) : (
                    playgroundItems.map((item, pIdx) => (
                      <div
                        key={item.id}
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('text/plain', String(pIdx));
                          e.dataTransfer.effectAllowed = 'move';
                          setDraggedPlaygroundIdx(pIdx);
                        }}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = 'move';
                          if (dragOverPlaygroundIdx !== pIdx) {
                            setDragOverPlaygroundIdx(pIdx);
                          }
                        }}
                        onDragLeave={() => {
                          if (dragOverPlaygroundIdx === pIdx) {
                            setDragOverPlaygroundIdx(null);
                          }
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          const fromIndex = draggedPlaygroundIdx;
                          setDraggedPlaygroundIdx(null);
                          setDragOverPlaygroundIdx(null);
                          if (fromIndex !== null && fromIndex !== pIdx) {
                            handlePlaygroundReorder(fromIndex, pIdx);
                          }
                        }}
                        onDragEnd={() => {
                          setDraggedPlaygroundIdx(null);
                          setDragOverPlaygroundIdx(null);
                        }}
                        className={`p-4 border rounded-sm space-y-3 relative transition-all duration-200 ${
                          draggedPlaygroundIdx === pIdx
                            ? 'opacity-40 scale-[0.98] border-[#2BB6A3] bg-[#2BB6A3]/10 shadow-2xl z-20'
                            : dragOverPlaygroundIdx === pIdx
                            ? 'border-[#2BB6A3] bg-[#2BB6A3]/20 shadow-lg scale-[1.01] z-10'
                            : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                          <div className="flex items-center gap-2.5 overflow-hidden min-w-0 pr-2">
                            <div
                              className="text-white/40 hover:text-[#2BB6A3] cursor-grab active:cursor-grabbing p-1 -ml-1 transition-colors shrink-0"
                              title="드래그하여 순서 변경"
                            >
                              <GripVertical className="w-5 h-5" />
                            </div>
                            <PlaygroundItemThumbnail item={item} />
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono font-bold text-[#2BB6A3] shrink-0">#{pIdx + 1}</span>
                                <span className="text-xs font-bold text-white/90 truncate">{item.title || '제목 없음'}</span>
                              </div>
                              <div className="flex items-center gap-1.5 mt-1 text-[10px] text-white/40 font-mono">
                                <span className="uppercase text-[#2BB6A3]/90 font-semibold">{item.type === 'video' ? 'VIDEO' : 'IMAGE/GIF'}</span>
                                <span>•</span>
                                <span>{item.aspectRatio || 'square'}</span>
                                {item.tag && (
                                  <>
                                    <span>•</span>
                                    <span className="bg-white/10 px-1.5 py-0.2 rounded text-white/70 truncate max-w-[120px] inline-block">{item.tag}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                if (!setPlaygroundItems) return;
                                setPlaygroundItems(playgroundItems.filter((_, idx) => idx !== pIdx));
                                showNotification('카드가 삭제되었습니다.');
                              }}
                              className="p-1.5 text-white/50 hover:text-red-400 hover:bg-white/10 rounded transition-colors"
                              title="삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                          {/* Title */}
                          <div className="sm:col-span-4 space-y-1">
                            <label className="text-[10px] font-mono text-white/50 block">제목 (Title)</label>
                            <input
                              type="text"
                              value={item.title}
                              onChange={(e) => {
                                if (!setPlaygroundItems) return;
                                const updated = playgroundItems.map((pg, idx) =>
                                  idx === pIdx ? { ...pg, title: e.target.value } : pg
                                );
                                setPlaygroundItems(updated);
                              }}
                              className="w-full px-2.5 py-1.5 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                            />
                          </div>

                          {/* Media Type */}
                          <div className="sm:col-span-3 space-y-1">
                            <label className="text-[10px] font-mono text-white/50 block">미디어 타입</label>
                            <select
                              value={item.type}
                              onChange={(e) => {
                                if (!setPlaygroundItems) return;
                                const updated = playgroundItems.map((pg, idx) =>
                                  idx === pIdx ? { ...pg, type: e.target.value as 'image' | 'video' } : pg
                                );
                                setPlaygroundItems(updated);
                              }}
                              className="w-full px-2.5 py-1.5 bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                            >
                              <option value="image">이미지 / GIF</option>
                              <option value="video">동영상 (MP4/WebM)</option>
                            </select>
                          </div>

                          {/* Aspect Ratio */}
                          <div className="sm:col-span-3 space-y-1">
                            <label className="text-[10px] font-mono text-white/50 block">비율 (Masonry)</label>
                            <select
                              value={item.aspectRatio || 'square'}
                              onChange={(e) => {
                                if (!setPlaygroundItems) return;
                                const updated = playgroundItems.map((pg, idx) =>
                                  idx === pIdx ? { ...pg, aspectRatio: e.target.value as any } : pg
                                );
                                setPlaygroundItems(updated);
                              }}
                              className="w-full px-2.5 py-1.5 bg-[#1a1a1a] border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                            >
                              <option value="vertical">세로 와이드 (9:16)</option>
                              <option value="tall">세로 긴형 (Tall 3:4)</option>
                              <option value="square">정사각형 (Square 1:1)</option>
                              <option value="wide">가로 와이드 (Wide 16:9)</option>
                              <option value="normal">일반 (Normal 4:3)</option>
                            </select>
                          </div>

                          {/* Tag */}
                          <div className="sm:col-span-2 space-y-1">
                            <label className="text-[10px] font-mono text-white/50 block">태그 (Tag)</label>
                            <input
                              type="text"
                              placeholder="예: 3D Motion"
                              value={item.tag || ''}
                              onChange={(e) => {
                                if (!setPlaygroundItems) return;
                                const updated = playgroundItems.map((pg, idx) =>
                                  idx === pIdx ? { ...pg, tag: e.target.value } : pg
                                );
                                setPlaygroundItems(updated);
                              }}
                              className="w-full px-2.5 py-1.5 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none font-mono"
                            />
                          </div>

                          {/* Media URL */}
                          <div className="sm:col-span-7 space-y-1">
                            <label className="text-[10px] font-mono text-white/50 block">미디어 파일 URL (GIF / MP4 / WebM)</label>
                            <input
                              type="text"
                              value={item.url}
                              onChange={(e) => {
                                if (!setPlaygroundItems) return;
                                const updated = playgroundItems.map((pg, idx) =>
                                  idx === pIdx ? { ...pg, url: e.target.value } : pg
                                );
                                setPlaygroundItems(updated);
                              }}
                              className="w-full px-2.5 py-1.5 bg-white/5 border border-white/10 text-white/80 text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none font-mono"
                            />
                          </div>

                          {/* Description */}
                          <div className="sm:col-span-5 space-y-1">
                            <label className="text-[10px] font-mono text-white/50 block">세부 설명</label>
                            <input
                              type="text"
                              value={item.description || ''}
                              onChange={(e) => {
                                if (!setPlaygroundItems) return;
                                const updated = playgroundItems.map((pg, idx) =>
                                  idx === pIdx ? { ...pg, description: e.target.value } : pg
                                );
                                setPlaygroundItems(updated);
                              }}
                              className="w-full px-2.5 py-1.5 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => showNotification('플레이그라운드 설정이 저장되었습니다.')}
                    className="px-6 py-2.5 bg-[#E06D3B] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#d45c2a] flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> 변경사항 반영
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: PROFILE & SHOWREEL */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-white/60">이름 (한글)</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-white/60">영문 이름</label>
                    <input
                      type="text"
                      value={profile.englishName}
                      onChange={(e) => setProfile({ ...profile, englishName: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-white/60">직함 (Title)</label>
                    <input
                      type="text"
                      value={profile.title}
                      onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-white/60">슬로건 (Tagline)</label>
                    <input
                      type="text"
                      value={profile.tagline}
                      onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-2 border border-[#2BB6A3]/30 bg-[#2BB6A3]/5 p-4 rounded-sm">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-[#2BB6A3] font-bold flex items-center gap-2">
                        <FileVideo className="w-4 h-4 text-[#2BB6A3]" />
                        <span>메인 Hero 배경 쇼릴 비디오 설정</span>
                      </label>
                      {uploadedFileName && (
                        <span className="text-[10px] font-mono text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded-xs border border-green-500/20">
                          ✓ PC 파일: {uploadedFileName}
                        </span>
                      )}
                    </div>

                    {/* PC File Selector */}
                    <div className="pt-1 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                      <label className="flex-1 cursor-pointer bg-white/10 hover:bg-[#2BB6A3] hover:text-white border border-white/20 text-white text-xs font-bold py-2.5 px-4 rounded-sm flex items-center justify-center gap-2 transition-all group">
                        <Upload className="w-4 h-4 text-[#2BB6A3] group-hover:text-white transition-colors" />
                        <span>내 PC에서 비디오 파일 선택 (.mp4, .mov, .webm)</span>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleShowreelFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>

                    <div className="pt-2">
                      <label className="text-[10px] font-mono text-white/50 block mb-1">
                        또는 외부 웹 비디오 URL 직접 입력:
                      </label>
                      <input
                        type="text"
                        value={profile.showreelVideoUrl}
                        onChange={(e) => setProfile({ ...profile, showreelVideoUrl: e.target.value })}
                        placeholder="https://.../video.mp4"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 space-y-2 border border-[#2BB6A3]/30 bg-[#2BB6A3]/5 p-4 rounded-sm">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-mono text-[#2BB6A3] font-bold flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-[#2BB6A3]" />
                        <span>About 페이지 증명사진 (프로필 사진) 설정</span>
                      </label>
                      {profile.profileImageUrl && (
                        <span className="text-[10px] font-mono text-[#2BB6A3] font-bold bg-[#2BB6A3]/10 px-2 py-0.5 rounded-xs border border-[#2BB6A3]/20">
                          ✓ 증명사진 등록됨
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center pt-1">
                      {/* Photo Preview Box */}
                      <div className="w-24 h-32 mx-auto sm:mx-0 rounded-sm overflow-hidden border border-white/20 bg-black/60 relative group flex items-center justify-center flex-shrink-0">
                        {profile.profileImageUrl ? (
                          <img
                            src={profile.profileImageUrl}
                            alt="Profile Photo Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center text-white/40 text-[10px] font-mono p-2 text-center">
                            <User className="w-6 h-6 mb-1 opacity-50 text-[#2BB6A3]" />
                            <span>사진 없음</span>
                          </div>
                        )}
                        <div className="absolute top-1 left-1 bg-black/80 px-1 py-0.5 rounded text-[8px] font-mono text-white/80">
                          미리보기
                        </div>
                      </div>

                      {/* Controls */}
                      <div className="sm:col-span-3 space-y-2.5">
                        <label className="cursor-pointer bg-white/10 hover:bg-[#2BB6A3] hover:text-white border border-white/20 text-white text-xs font-bold py-2.5 px-4 rounded-sm flex items-center justify-center gap-2 transition-all group shadow-md">
                          <Upload className="w-4 h-4 text-[#2BB6A3] group-hover:text-white transition-colors" />
                          <span>내 PC에서 증명사진 파일 선택 (.jpg, .png, .webp)</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageUpload}
                            className="hidden"
                          />
                        </label>

                        <div>
                          <label className="text-[10px] font-mono text-white/50 block mb-1">
                            또는 사진 웹 URL 직접 입력:
                          </label>
                          <input
                            type="text"
                            value={profile.profileImageUrl || ''}
                            onChange={(e) => setProfile({ ...profile, profileImageUrl: e.target.value })}
                            placeholder="https://.../photo.jpg 또는 data:image/..."
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-white/60">이메일 주소</label>
                    <input
                      type="text"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-mono text-white/60">전화번호 (Phone Number)</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      placeholder="010-0000-0000"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#E06D3B] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#d45c2a] flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> 프로필 저장
                  </button>
                </div>
              </form>
            )}

            {/* TAB 3: SKILLS MANAGEMENT */}
            {activeTab === 'skills' && (
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-4 border border-white/10 bg-white/[0.02] rounded-sm space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-white">{skill.name}</h4>
                        <span className="text-xs font-mono text-[#2BB6A3] font-bold">
                          {skill.percentage}%
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/50">별점 Rating (1 ~ 5)</label>
                          <input
                            type="number"
                            min={1}
                            max={5}
                            value={skill.rating}
                            onChange={(e) => handleUpdateSkill(skill.id, 'rating', Number(e.target.value))}
                            className="w-full px-3 py-1.5 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-white/50">숙련도 Percentage (%)</label>
                          <input
                            type="number"
                            min={0}
                            max={100}
                            value={skill.percentage}
                            onChange={(e) => handleUpdateSkill(skill.id, 'percentage', Number(e.target.value))}
                            className="w-full px-3 py-1.5 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-white/50">설명 (Description)</label>
                        <input
                          type="text"
                          value={skill.description}
                          onChange={(e) => handleUpdateSkill(skill.id, 'description', e.target.value)}
                          className="w-full px-3 py-1.5 bg-white/5 border border-white/10 text-white text-xs rounded-sm focus:border-[#2BB6A3] focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <button
                    onClick={() => showNotification('기술 스택 정보가 업데이트 되었습니다.')}
                    className="px-6 py-2.5 bg-[#E06D3B] text-white text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-[#d45c2a] flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> 변경사항 반영
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Bottom Reset Control */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#111111] flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('초기 샘플 데이터로 복원하시겠습니까?')) {
                onResetData();
                showNotification('초기 데이터로 복원되었습니다.');
              }
            }}
            className="text-xs font-mono text-white/40 hover:text-red-400 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset to Defaults
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-white/10 text-xs text-white font-medium rounded-sm hover:bg-white/20"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
