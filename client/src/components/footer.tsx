import { useState } from 'react';
// import removed: useLanguage
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Send, Mail, Bug, MessageSquare } from 'lucide-react';

export function Footer() {
  // const t = {};
  const { toast } = useToast();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast({
        title: t.footerErrorTitle || 'Campo vazio',
        description: t.footerErrorDesc || 'Por favor, escreva sua mensagem',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      // Open email client with pre-filled message
      const subject = encodeURIComponent('Code Flow - Sugestão/Bug');
      const body = encodeURIComponent(message);
      const mailtoLink = `mailto:codeflowbr@outlook.com?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;
      
      toast({
        title: t.footerSuccessTitle || 'Email aberto!',
        description: t.footerSuccessDesc || 'Seu cliente de email foi aberto com a mensagem',
      });

      setMessage('');
    } catch (error) {
      toast({
        title: t.footerErrorTitle || 'Erro',
        description: t.footerErrorSend || 'Não foi possível abrir o email',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900/50 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold text-white">
                {t.footerTitle || 'Sugestões & Bugs'}
              </h3>
            </div>
            
            <p className="text-sm text-gray-400">
              {t.footerDescription || 'Ajude-nos a melhorar! Envie suas sugestões ou reporte bugs diretamente para nossa equipe.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              <Textarea
                placeholder={t.footerPlaceholder || 'Descreva sua sugestão ou bug encontrado...'}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px] bg-slate-800/50 border-slate-700 focus:border-primary resize-none"
                maxLength={1000}
              />
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  {message.length}/1000
                </span>
                <Button 
                  type="submit" 
                  disabled={loading || !message.trim()}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {t.footerSendButton || 'Enviar'}
                </Button>
              </div>
            </form>

            <div className="flex items-center gap-2 text-sm text-gray-400 mt-4">
              <Mail className="w-4 h-4" />
              <a 
                href="mailto:codeflowbr@outlook.com" 
                className="hover:text-primary transition-colors"
              >
                codeflowbr@outlook.com
              </a>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Bug className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-bold text-white">
                {t.footerHelpTitle || 'Como Ajudar'}
              </h3>
            </div>

            <div className="space-y-3 text-sm text-gray-300">
              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                <h4 className="font-semibold text-white mb-2">
                  {t.footerBugTitle || '🐛 Reportar Bugs'}
                </h4>
                <p className="text-gray-400">
                  {t.footerBugDesc || 'Encontrou algo que não funciona? Descreva o problema detalhadamente para que possamos corrigi-lo rapidamente.'}
                </p>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                <h4 className="font-semibold text-white mb-2">
                  {t.footerSuggestionTitle || '💡 Sugestões'}
                </h4>
                <p className="text-gray-400">
                  {t.footerSuggestionDesc || 'Tem uma ideia para melhorar o Code Flow? Compartilhe conosco! Adoramos feedback da comunidade.'}
                </p>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                <h4 className="font-semibold text-white mb-2">
                  {t.footerFeatureTitle || '✨ Novas Features'}
                </h4>
                <p className="text-gray-400">
                  {t.footerFeatureDesc || 'Quer ver uma nova funcionalidade no Code Flow? Envie sua proposta e ela pode se tornar realidade!'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Code Flow BR. {t.footerRights || 'Todos os direitos reservados.'}</p>
        </div>
      </div>
    </footer>
  );
}
