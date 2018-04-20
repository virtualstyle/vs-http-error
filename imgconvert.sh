#!/bin/bash

importstring=""
for file in src/scss/{..?,.[!.],}*; do
  if [ -f $file ]

  then

    while read -r line ; do

        images[$count]=$(echo "$line" | tr -d '"'| sed -e "s/^url(//" -e "s/)$//")
        #echo ${images[$count]}
        urls[$count]=$(echo "$line" | sed -E "s/url\(.*\.(png|jpg|jpeg|gif|svg).*\)/\$url_$count/g")

        filename=$(basename -- "${images[$count]}")
        extension="${filename##*.}"
        filename="${filename%.*}"

        #echo $filename
        echo "$line" | sed -E "s/url\(.*\.(png|jpg|jpeg|gif|svg).*\)/\$$filename/g"

        sed -E -i "s/url\(.*\.(png|jpg|jpeg|gif|svg).*\)/\$$filename/g" $file

        datauri src/${images[$count]} src/scss

        #echo ${images[$count]} | sed -E "s/url\(//g" | sed -E "s/\)//g"
        #echo ${urls[$count]}
        importstring="$importstring \"$filename\","
        #echo "src/scss/_$filename.scss"

    done < <(grep -o "url(.*\.\(png\|jpg\|jpeg\|gif\|svg\).*)" $file)
  fi
done

importstring=$(echo $importstring | sed 's/,*$//g')
importfound=0

while read -r line ; do

    oldimport=$line
    import=$(echo "$line" | sed 's/;*$//g')
    importfound=1

done < <(grep "\@import" src/scss/style.scss)

if [[ importfound -eq 1 ]]; then
  import="$import, $importstring;"
  sed -i "s/$oldimport/$import/g" src/scss/style.scss
else
  import="@import $importstring;"
  echo $import >> src/scss/style.scss
fi
