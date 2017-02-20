<VirtualHost *:80>
	ServerAdmin webmaster@localhost
	ServerName www.piuvolume.com
	ServerAlias piuvolume.com piuvolume.wp.flyer.it 
	DocumentRoot /sites/wp.flyer/
	<Directory />
		Options FollowSymLinks
		AllowOverride None
	</Directory>
	<Directory /sites/wp.flyer/>
		Options FollowSymLinks MultiViews
		AllowOverride All
		Order allow,deny
		allow from all
		# This directive allows us to have apache2's default start page
                # in /apache2-default/, but still have / go to the right place
		#RedirectMatch ^/$ /apache2-default/
	</Directory>

	ScriptAlias /cgi-bin/ /usr/lib/cgi-bin/
	<Directory "/usr/lib/cgi-bin">
		AllowOverride None
		Options ExecCGI MultiViews SymLinksIfOwnerMatch
		Order allow,deny
		Allow from all
	</Directory>

	ErrorLog /var/log/apache2/www_piuvolume_com-error.log

	# Possible values include: debug, info, notice, warn, error, crit,
	# alert, emerg.
	LogLevel warn

	CustomLog /var/log/apache2/www_piuvolume_com-access.log combined
	ServerSignature On

#    Alias /doc/ "/usr/share/doc/"
#    <Directory "/usr/share/doc/">
#        Options Indexes MultiViews FollowSymLinks
#        AllowOverride None
#        Order deny,allow
#        Deny from all
#        Allow from 127.0.0.0/255.0.0.0 ::1/128
#    </Directory>

</VirtualHost>
