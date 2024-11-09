<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes"/>
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Розклад автобусів</title>
                <style>
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 8px;
                        border: 1px solid #ddd;
                        text-align: center;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h1>Розклад автобусів</h1>
                <table>
                    <tr>
                        <th>Напрямок</th>
                        <th>Дата відправлення</th>
                        <th>Час відправлення</th>
                        <th>Вартість квитка</th>
                        <th>Кількість вільних місць</th>
                        <th>Зупинки</th>
                    </tr>
                    <xsl:for-each select="bus_schedule/route">
                        <tr>
                            <td><xsl:value-of select="departure"/></td>
                            <td><xsl:value-of select="date"/></td>
                            <td><xsl:value-of select="time"/></td>
                            <td><xsl:value-of select="price"/></td>
                            <td><xsl:value-of select="seats_left"/></td>
                            <td>
                                <xsl:for-each select="stops/stop">
                                    <xsl:value-of select="."/> <br/>
                                </xsl:for-each>
                            </td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
