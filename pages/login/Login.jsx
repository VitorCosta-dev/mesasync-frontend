import React, { useState } from 'react';
import { Eye, EyeOff, ArrowRight, UtensilsCrossed, ChefHat, Soup } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card } from '../../components/ui/card';

export default function Login() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <main className="page">
      <div className="decoration d1"><UtensilsCrossed /></div>
      <div className="decoration d2"><Soup /></div>
      <div className="decoration d3"><ChefHat /></div>
      <div className="decoration d4"><UtensilsCrossed /></div>
      <div className="decoration d5"><UtensilsCrossed /></div>
      <div className="decoration d6"><Soup /></div>
      <div className="background-dots dots1" />
      <div className="background-dots dots2" />
      <div className="orbit orbit1" />
      <div className="orbit orbit2" />

      <div className="shell">
        <div className="brand">
          <div className="logo-wrap">
            <img src="/logo-crop.png" alt="MesaSync — Sistema inteligente de comanda" />
          </div>
          <span className="brand-tag"><span /> SIMPLES DO INÍCIO AO FIM</span>
        </div>

        <Card className="card">
          <div className="card-top">
            <span className="eyebrow"><span /> ACESSO AO SISTEMA</span>
            <div className="mark"><UtensilsCrossed size={18} /></div>
          </div>

          <h1>Que bom ter<br />você <em>de volta.</em></h1>
          <p className="intro">Entre na sua conta para começar a organizar suas comandas.</p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setMessage('A integração com o sistema será feita em uma próxima etapa.');
            }}
          >
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="seuemail@exemplo.com" autoComplete="username" required />

            <Label htmlFor="password">Senha</Label>
            <div className="password">
              <Input
                id="password"
                type={show ? 'text' : 'password'}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
              />
              <Button
                variant="ghost"
                type="button"
                onClick={() => setShow(!show)}
                aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
                aria-pressed={show}
              >
                {show ? <EyeOff size={19} /> : <Eye size={19} />}
              </Button>
            </div>

            <Button className="submit" type="submit">
              <span>Entrar</span>
              <ArrowRight size={19} />
            </Button>

            {message && <p className="message" role="status">{message}</p>}
          </form>

          <div className="card-bottom"><span className="dot" /> SEU RESTAURANTE EM SINTONIA</div>
        </Card>

        <footer>Feito para simplificar o seu dia <span>✳</span></footer>
      </div>
    </main>
  );
}