WickedPdf.config do |config|  
  if Rails.env == 'production' then
    config.exe_path = Rails.root.to_s + "/bin/wkhtmltopdf"
  else 
    config.exe_path = '/Users/sharon/.rvm/gems/ruby-2.2.0/bin/wkhtmltopdf' 
  end
end