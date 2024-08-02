import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  // 여기에 React에서 사용할 Electron API 함수들을 정의합니다.
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  // 예: 파일 열기 대화상자를 표시하는 함수
});