npx mix build 

wait

cd public_html/images 

cwebp -q 50 -resize 0 60 -mt whatsapp.png -o whatsapp.webp 
cwebp -q 50 -resize 0 200 -mt propiedades_chaiten.png -o propiedades_chaiten.webp 
cwebp -q 50 -resize 0 200 -mt logo.png -o logo.webp 
cwebp -q 50  -mt pin.png -o pin.webp 
cwebp -q 50 -resize 0 100 -mt direction.png -o direction.webp 
cwebp -q 50 -resize 0 100 -mt document.png -o document.webp 
cwebp -q 50 -resize 0 100 -mt fence.png -o fence.webp 
cwebp -q 50 -resize 0 100 -mt power.png -o power.webp 
cwebp -q 50 -resize 0 100 -mt direction.png -o direction.webp 
cwebp -q 50 -resize 0 124 -mt favicon.png -o favicon.webp 
cwebp -q 50 -mt aerea.jpg -o aerea.webp 
cwebp -q 50 -mt panorama.jpg -o panorama.webp 

rm *.jpg 
rm *.png 

cd galeria 
cwebp -q 50 -resize 0 1200 -mt 0001.jpg -o 0001.webp  
cwebp -q 50 -resize 0 1200 -mt 0002.jpg -o 0002.webp 
cwebp -q 50 -resize 0 1200 -mt 0003.jpg -o 0003.webp 
cwebp -q 50 -resize 0 1200 -mt 0004.jpg -o 0004.webp 
cwebp -q 50 -resize 0 1200 -mt 0005.jpg -o 0005.webp 
cwebp -q 50 -resize 0 1200 -mt 0006.jpg -o 0006.webp 
cwebp -q 50 -resize 0 1200 -mt 0007.jpg -o 0007.webp 
cwebp -q 50 -resize 0 1200 -mt 0008.jpg -o 0008.webp 
cwebp -q 50 -resize 0 1200 -mt 0009.jpg -o 0009.webp 
cwebp -q 50 -resize 0 1200 -mt 0010.jpg -o 0010.webp 
cwebp -q 50 -resize 0 1200 -mt 0011.jpg -o 0011.webp 
rm *.jpg


cd ../../

sed -i'.bak' -e 's/\.jpg/\.webp/g' index.html
sed -i'.bak' -e 's/\.png/\.webp/g' index.html



