{
    'name': "PDF Report Generator",
    'summary': "Dynamic Report Generator",
    'author': "Innovyou",
    'website': "http://www.innovyou.co",
    'category': 'web',
    'version': '16.0.0.1',
    'application': False,
    'installable': True,
    'depends': [
        'base',
        'mail',
        'web_widget_colorpicker',
        'web'
    ],
    'assets': {
        'web.assets_backend': [
            '/pdf_generator/static/src/js/widget.js',
            '/pdf_generator/static/src/scss/modal.scss'
        ]
    },
    'data': [
        'security/security.xml',
        'security/groups.xml',
        'security/ir.model.access.csv',
        
        'menu/actions.xml',
        'menu/items.xml',
        
        'views/report_views.xml',
        'views/report_placeholder_views.xml',
        'views/report_placeholder_font_views.xml',
        'views/ir_actions_server_views.xml',
        
        'wizards/views/output_wizard_views.xml',
        'wizards/views/preview_wizard_views.xml',

        #'templates/web_templates.xml'
    ],
    'qweb': [
        'static/src/xml/widget_template.xml'
    ],
    'post_init_hook': 'post_init_hook'
}