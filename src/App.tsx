import { useState, useRef } from 'react'
import { 
  Store, 
  ShoppingBag, 
  Globe, 
  Camera, 
  Truck, 
  Handshake, 
  CheckCircle, 
  MessageCircle, 
  Send,
  MapPin,
  Mail,
  Sun,
  Menu,
  X,
  Phone
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import './App.css'

// Контакты (замените на свои)
const TELEGRAM_USERNAME = 'goodglasses1'
const TELEGRAM_LINK = `https://t.me/${TELEGRAM_USERNAME}`
const PHONE_NUMBER = '+7 (999) 999-99-99'
const PHONE_LINK = 'tel:+79999999999'



interface FormData {
  name: string
  phone: string
  city: string
  telegram: string  // ← добавьте это
  comment: string
  privacyAccepted: boolean
}

function App() {
  const [formData, setFormData] = useState<FormData>({
  name: '',
  phone: '',
  city: '',
  telegram: '',  // ← добавьте это
  comment: '',
  privacyAccepted: false
})

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false)
  
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const openTelegram = () => {
    window.open(TELEGRAM_LINK, '_blank')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (checked: boolean) => {
  setFormData(prev => ({ ...prev, privacyAccepted: checked }))
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!formData.name || !formData.phone) {
    toast.error('Пожалуйста, заполните обязательные поля')
    return
  }

  if (!formData.privacyAccepted) {
    toast.error('Пожалуйста, примите политику конфиденциальности')
    return
  }

  setIsSubmitting(true)

  try {
    const res = await fetch('/api/send-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        city: formData.city,
        telegram: formData.telegram,
        comment: formData.comment,
      }),
    })

    if (!res.ok) {
      throw new Error('Ошибка отправки')
    }

    toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.')
    setFormData({
      name: '',
      phone: '',
      city: '',
      telegram: '',
      comment: '',
      privacyAccepted: false,
    })
  } catch (error) {
    toast.error('Ошибка отправки заявки. Попробуйте позже.')
  } finally {
    setIsSubmitting(false)
  }
}


    
   
  const audienceItems = [
    { icon: Store, text: 'Магазины аксессуаров' },
    { icon: ShoppingBag, text: 'Продавцы на маркетплейсах' },
    { icon: Globe, text: 'Онлайн-продавцы и шоурумы' },
  ]

  const benefitsItems = [
    { icon: Sun, text: 'Актуальные модели сезона' },
    { icon: Camera, text: 'Фото и видео товара по запросу' },
    { icon: Truck, text: 'Возможность регулярных поставок' },
    { icon: Handshake, text: 'Индивидуальное обсуждение условий' },
  ]

  const catalogItems = [
    { image: '/images/glasses-new-01.jpg', title: 'Золотые овальные' },
    { image: '/images/glasses-newn-02.jpg', title: 'Премиум авиаторы' },
    { image: '/images/glasses-new-03.jpg', title: 'Стильные жёлтые линзы' },
    { image: '/images/glasses-new-04.jpg', title: 'Женская классика' },
    { image: '/images/glasses-05.jpg', title: 'Премиальная классика' },
    { image: '/images/glasses-06.jpg', title: 'Лёгкая элегантность' },
    { image: '/images/glasses-07.jpg', title: 'Гламурный стиль' },
    { image: '/images/glasses-08.jpg', title: 'Современный дизайн' },
  ]

  const trustItems = [
    'Работаем с магазинами и продавцами',
    'Отгружаем по России',
    'Все условия обсуждаются напрямую',
  ]

  const stepsItems = [
    'Оставьте заявку на сайте или напишите в Telegram',
    'Мы свяжемся и уточним формат сотрудничества',
    'Предоставим каталог и информацию по условиям',
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Модальное окно политики конфиденциальности */}
      {privacyModalOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setPrivacyModalOpen(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl max-h-[80vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">Политика конфиденциальности</h2>
              <button 
                onClick={() => setPrivacyModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] text-sm text-gray-700 space-y-4">
              <p><strong>Дата последнего обновления:</strong> 08.02.2026</p>
              
              <p>Настоящая Политика конфиденциальности описывает, каким образом сайт собирает, использует, защищает и раскрывает информацию о пользователях.</p>
              
              <h3 className="font-semibold text-gray-900 mt-4">1. Сбор персональных данных</h3>
              <p>Сайт может собирать следующие данные:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Имя, адрес электронной почты, номер телефона (если пользователь их предоставляет через формы обратной связи);</li>
                <li>IP-адрес, тип браузера, язык браузера, дату и время посещения страниц сайта, адрес посещаемых страниц;</li>
                <li>Другие данные, необходимые для предоставления услуг и улучшения работы сайта.</li>
              </ul>
              
              <h3 className="font-semibold text-gray-900 mt-4">2. Использование персональных данных</h3>
              <p>Собранные данные могут использоваться для:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Предоставления запрашиваемых услуг;</li>
                <li>Улучшения работы сайта и анализа посещаемости;</li>
                <li>Связи с пользователем (отправка уведомлений, ответов на запросы);</li>
                <li>Проведения рекламных кампаний и таргетирования с использованием сервисов Яндекса.</li>
              </ul>
              
              <h3 className="font-semibold text-gray-900 mt-4">3. Использование сервисов Яндекса</h3>
              <p>Сайт использует сервисы Яндекса, которые могут собирать данные о поведении пользователей:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Яндекс.Метрика:</strong> собирает статистику посещений, кликов и взаимодействий на сайте.</li>
                <li><strong>Реклама Яндекса:</strong> может показывать персонализированные объявления на основе поведения пользователя на сайте.</li>
              </ul>
              
              <h3 className="font-semibold text-gray-900 mt-4">4. Передача и защита данных</h3>
              <p>Сайт не продает и не передает персональные данные третьим лицам, кроме случаев, предусмотренных законодательством. Для защиты данных используются технические и организационные меры безопасности.</p>
              
              <h3 className="font-semibold text-gray-900 mt-4">5. Права пользователя</h3>
              <p>Пользователь имеет право запрашивать доступ к своим персональным данным, требовать исправления, удаления или ограничения обработки данных, отозвать согласие на обработку данных в любой момент.</p>
              
              <h3 className="font-semibold text-gray-900 mt-4">6. Использование файлов cookie</h3>
              <p>Сайт использует cookies для улучшения работы сайта, сбора статистики через Яндекс.Метрику и настройки персонализированной рекламы. Пользователь может отключить cookies в настройках браузера.</p>
              
              <h3 className="font-semibold text-gray-900 mt-4">7. Изменения политики</h3>
              <p>Сайт оставляет за собой право вносить изменения в Политику конфиденциальности. Новая версия вступает в силу с момента публикации на сайте.</p>
            </div>
            <div className="p-6 border-t border-gray-100">
              <Button 
                onClick={() => setPrivacyModalOpen(false)}
                className="w-full bg-green-500 hover:bg-green-600"
              >
                Закрыть
              </Button>
            </div>
          </div>
        </>
      )}

      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-40 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Sun className="w-6 h-6 text-amber-500" />
              <span className="font-semibold text-gray-900">OpticPartner</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href={PHONE_LINK}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
               {/* <Phone className="w-4 h-4" />
                <span className="text-sm">{PHONE_NUMBER}</span> */}
              </a>
              <button onClick={scrollToForm} className="text-gray-600 hover:text-gray-900 transition-colors">
                Условия
              </button>
              <button onClick={openTelegram} className="text-gray-600 hover:text-gray-900 transition-colors">
                Telegram
              </button>
              <Button 
                onClick={scrollToForm} 
                size="sm"
                className="bg-green-500 hover:bg-green-600"
              >
                Получить условия
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4">
            <div className="flex flex-col gap-4">
              <a 
                href={PHONE_LINK}
                className="flex items-center gap-2 text-gray-600"
              >
                <Phone className="w-4 h-4" />
                <span>{PHONE_NUMBER}</span>
              </a>
              <button onClick={() => { scrollToForm(); setMobileMenuOpen(false); }} className="text-left text-gray-600">
                Условия сотрудничества
              </button>
              <button onClick={() => { openTelegram(); setMobileMenuOpen(false); }} className="text-left text-gray-600">
                Написать в Telegram
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Поставки солнцезащитных очков<br className="hidden sm:block" /> для магазинов и продавцов
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Предложения для партнёров · Отгрузка по РФ · Условия по запросу
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToForm}
              className="bg-green-500 hover:bg-green-600 text-white px-8"
            >
              Получить условия сотрудничества
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={openTelegram}
              className="border-2 border-blue-500 text-blue-600 hover:bg-blue-50 px-8"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Написать в Telegram
            </Button>
          </div>
        </div>
      </section>

      {/* Кому подойдёт */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Кому подойдёт
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {audienceItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-amber-600" />
                </div>
                <p className="text-gray-800 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Что вы получаете */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Что вы получаете
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitsItems.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-gray-700">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ассортимент */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
            Примеры моделей солнцезащитных очков
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Актуальные коллекции сезона 2026. Фото и видео доступны по запросу.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {catalogItems.map((item, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-800 font-medium text-center">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button 
              onClick={scrollToForm} 
              variant="outline" 
              size="lg"
              className="border-green-500 text-green-600 hover:bg-green-50"
            >
              Узнать условия сотрудничества
            </Button>
          </div>
        </div>
      </section>

      {/* Блок доверия */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 md:p-12 text-white">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Почему выбирают нас
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {trustItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-200 flex-shrink-0" />
                  <span className="text-green-50">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA для тёплых */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Получите условия сотрудничества и информацию по ассортименту
          </h2>
          <Button 
            size="lg" 
            onClick={scrollToForm}
            className="bg-green-500 hover:bg-green-600 text-white px-8"
          >
            Получить условия сотрудничества
          </Button>
        </div>
      </section>

      {/* Как начать сотрудничество */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Как начать сотрудничество
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {stepsItems.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 pt-2">{item}</p>
                </div>
                {index < stepsItems.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-5 w-full h-0.5 bg-green-200 -z-10" style={{ width: 'calc(100% - 20px)', transform: 'translateX(50%)' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA для горячих */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Удобнее обсудить напрямую?
          </h2>
          <Button 
            size="lg" 
            onClick={openTelegram}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Написать в Telegram
          </Button>
        </div>
      </section>

      {/* Форма заявки */}
<section ref={formRef} className="py-16">
  <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
        Получить условия сотрудничества
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name" className="text-gray-700">
            Имя <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ваше имя"
            className="mt-2"
            required
          />
        </div>
        <div>
          <Label htmlFor="phone" className="text-gray-700">
            Телефон <span className="text-red-500">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+7 (999) 999-99-99"
            className="mt-2"
            required
          />
        </div>
        <div>
          <Label htmlFor="city" className="text-gray-700">
            Город
          </Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Ваш город"
            className="mt-2"
          />
        </div>
        
        {/* НОВОЕ ПОЛЕ TELEGRAM */}
        <div>
          <Label htmlFor="telegram" className="text-gray-700">
            Telegram
          </Label>
          <Input
            id="telegram"
            name="telegram"
            value={formData.telegram}
            onChange={handleInputChange}
            placeholder="@ваше имя"
            className="mt-2"
          />
        </div>
        
        {/* ПОЛЕ КОММЕНТАРИЙ */}
        <div>
          <Label htmlFor="comment" className="text-gray-700">
            Комментарий
          </Label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
            placeholder="Ваш комментарий"
            rows={4}
            className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
          />
        </div>

        {/* Чекбокс согласия с политикой */}
        <div className="flex items-start gap-3">
          <Checkbox 
            id="privacy" 
            checked={formData.privacyAccepted}
            onCheckedChange={handleCheckboxChange}
            className="mt-1"
          />
          <Label htmlFor="privacy" className="text-sm text-gray-600 cursor-pointer">
            Нажимая «Отправить», вы соглашаетесь с{' '}
            <button 
              type="button"
              onClick={() => setPrivacyModalOpen(true)}
              className="text-blue-600 underline hover:text-blue-700"
            >
              Политикой конфиденциальности
            </button>
          </Label>
        </div>

        <Button 
          type="submit" 
          size="lg" 
          className="w-full bg-green-500 hover:bg-green-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Отправка...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Отправить заявку
            </span>
          )}
        </Button>
      </form>
      <div className="mt-6 pt-6 border-t border-gray-100 text-center">
        <p className="text-gray-600 mb-3">Или напишите нам в Telegram</p>
        <Button 
          variant="outline" 
          onClick={openTelegram}
          className="border-blue-500 bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Написать
        </Button>
      </div>
    </div>
  </div>
</section>

    {/* Контакты */}
<section className="py-16 bg-gray-50">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
      Контакты
    </h2>
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Mail className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <a href="mailto:kirillfamirik@gmail.com" className="text-gray-800 hover:text-blue-600">
            kirillfamirik@gmail.com
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
        {/*  <Phone className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Телефон</p>
          <a href={PHONE_LINK} className="text-gray-800 hover:text-green-600">
            {PHONE_NUMBER}
          </a> */}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Telegram</p>
          <a href="https://t.me/optic_partner" target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:text-blue-600">
            @optic_partner
          </a>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
          <MapPin className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Город</p>
          <p className="text-gray-800">Москва</p>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Футер */}
      <footer className="py-8 bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-800 pb-6 mb-6">
            <p className="text-sm text-center">
              Солнцезащитные очки. Не являются медицинским изделием. Не предназначены для коррекции зрения.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-amber-500" />
              <span className="text-white font-medium">OpticPartner</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <button 
                onClick={() => setPrivacyModalOpen(true)}
                className="hover:text-white transition-colors"
              >
                Политика конфиденциальности
              </button>
            </div>
            <p className="text-sm">© 2026 Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
