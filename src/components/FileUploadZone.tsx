import { useState, useCallback } from "react";
import { Upload, File, Folder, X } from "lucide-react";
import { CyberButton } from "@/components/ui/cyber-button";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  content?: string;
}

interface FileUploadZoneProps {
  onFilesUploaded: (files: UploadedFile[]) => void;
  uploadedFiles: UploadedFile[];
  onRemoveFile: (fileId: string) => void;
}

export const FileUploadZone = ({ onFilesUploaded, uploadedFiles, onRemoveFile }: FileUploadZoneProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  }, []);

  const processFiles = useCallback(async (files: File[]) => {
    const processedFiles: UploadedFile[] = [];

    for (const file of files) {
      const uploadedFile: UploadedFile = {
        id: crypto.randomUUID(),
        name: file.name,
        size: file.size,
        type: file.type,
      };

      // Read text files
      if (file.type.startsWith('text/') || 
          file.name.endsWith('.js') || 
          file.name.endsWith('.ts') ||
          file.name.endsWith('.py') ||
          file.name.endsWith('.php') ||
          file.name.endsWith('.html') ||
          file.name.endsWith('.css') ||
          file.name.endsWith('.json')) {
        try {
          uploadedFile.content = await file.text();
        } catch (error) {
          console.error('Error reading file:', error);
        }
      }

      processedFiles.push(uploadedFile);
    }

    onFilesUploaded(processedFiles);
  }, [onFilesUploaded]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative glass-panel rounded-lg border-2 border-dashed p-8 text-center transition-all ${
          dragActive 
            ? "border-neon-cyan bg-neon-cyan/5 shadow-neon" 
            : "border-neon-cyan/30 hover:border-neon-cyan/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept=".zip,.py,.php,.html,.js,.ts,.css,.json,.txt,.md,image/*,video/*"
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-gradient-cyber flex items-center justify-center">
            <Upload className="h-6 w-6 text-neon-cyan" />
          </div>
          
          <div>
            <h3 className="text-lg font-cyber text-neon-cyan mb-2">Upload Files & Folders</h3>
            <p className="text-muted-foreground">
              Drag & drop files here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports: ZIP, Code files, Images, Videos
            </p>
          </div>
          
          <CyberButton variant="outline" size="sm">
            Browse Files
          </CyberButton>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-cyber text-neon-cyan">Uploaded Files</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="glass-panel rounded-lg p-3 flex items-center justify-between hover:border-neon-cyan/40 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-neon-cyan/10 flex items-center justify-center">
                    {file.type.startsWith('image/') ? (
                      <File className="h-4 w-4 text-neon-pink" />
                    ) : file.name.endsWith('.zip') ? (
                      <Folder className="h-4 w-4 text-neon-purple" />
                    ) : (
                      <File className="h-4 w-4 text-neon-cyan" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-glass-foreground">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                
                <CyberButton
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveFile(file.id)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </CyberButton>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};