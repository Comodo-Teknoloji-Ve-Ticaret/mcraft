# MC Raft Website

Bu proje Vite + React ile gelistirilmis ve GitHub Pages uzerinden yayinlanir.

## Gelistirme

Yerel ortamda calistirmak icin:

```bash
npm install
npm run dev
```

Uretim build'i almak icin:

```bash
npm run build
```

## Yayin Akisi

Bu projede kaynak kod branch'i `main`, yayin branch'i `gh-pages` olarak kullanilir.

Yeni guncellemeleri yayina almak icin:

```bash
git checkout main
git add .
git commit -m "guncelleme"
git push origin main
npm run publish
```

`npm run publish` komutu `npm run deploy` cagirir ve `dist` klasorunu otomatik olarak `gh-pages` branch'ine yollar.

## Onemli Notlar

- Kaynak kodu dogrudan `gh-pages` branch'inde gelistirmeyin.
- Tum kod degisiklikleri `main` branch'inde yapilmali.
- GitHub Pages ayarinda source olarak `gh-pages` branch'i ve root klasoru secili olmali.
- Yayin guncellemesi GitHub tarafinda birkac dakika gecikmeli gorunebilir.
