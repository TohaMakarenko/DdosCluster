- качаєш [інсталятор дя Windows Node](https://nodejs.org/uk/download/), встановлюєщ
- касаєш gcloud [звідси](https://cloud.google.com/sdk/docs/install) і ставиш за інструкцією, при встановленні відміть All users коли запитає, при ініціалізації вибираєш регіон якусь Європу чи Азію (хоча для цього скріпта це не впливає)
- для кожно імеджа (а може і не для кожного) виконуєш gcloud compute ssh *ім'я імеджа* --zone=*його зона*, це треба для кешування ключів

Запускать треба через node: відкриваємо папку куди скачали проект, відкриваємо в ній консоль і вводимо: `node start.js 95.173.136.70 443`, де перший параметр це іп чи адрес до жертви а другий це порт

Жертви можна брати [звідси](https://docs.google.com/spreadsheets/d/1CGimNXk_8zQoIHoVPC_XvtbIqEt2QiWR4LDtAgzRtmU/edit#gid=1302997704)